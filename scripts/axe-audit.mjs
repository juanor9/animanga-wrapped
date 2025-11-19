import { JSDOM } from 'jsdom';
import axe from 'axe-core';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function runAccessibilityAudit() {
  console.log('\n🔍 Running accessibility audit...\n');
  console.log(`URL: ${BASE_URL}\n`);

  try {
    // Fetch the page HTML
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status} ${response.statusText}`);
    }
    const html = await response.text();

    // Create JSDOM instance
    const dom = new JSDOM(html, {
      url: BASE_URL,
      runScripts: 'outside-only',
      resources: 'usable'
    });

    const { window } = dom;
    const { document } = window;

    // Set globals for axe-core
    global.window = window;
    global.document = document;

    // Configure axe-core
    axe.configure({
      rules: [
        { id: 'color-contrast', enabled: true },
        { id: 'heading-order', enabled: true },
        { id: 'image-alt', enabled: true },
        { id: 'label', enabled: true },
        { id: 'link-name', enabled: true },
        { id: 'button-name', enabled: true },
        { id: 'region', enabled: true }
      ]
    });

    // Run axe-core
    const results = await axe.run(document.documentElement, {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']
      },
      resultTypes: ['violations', 'incomplete']
    });

    if (results.violations.length === 0) {
      console.log('✅ No accessibility violations found!\n');
    } else {
      console.log(`❌ Found ${results.violations.length} accessibility violations:\n`);

      results.violations.forEach((violation, index) => {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`Violation ${index + 1}: ${violation.id}`);
        console.log(`${'='.repeat(60)}`);
        console.log(`Impact: ${violation.impact}`);
        console.log(`Description: ${violation.description}`);
        console.log(`Help: ${violation.help}`);
        console.log(`Help URL: ${violation.helpUrl}`);
        console.log(`\nAffected elements (${violation.nodes.length}):`);

        violation.nodes.forEach((node, nodeIndex) => {
          console.log(`\n  ${nodeIndex + 1}. ${node.target.join(' > ')}`);
          console.log(`     HTML: ${node.html.substring(0, 200)}${node.html.length > 200 ? '...' : ''}`);
          console.log(`     Fix: ${node.failureSummary}`);
        });
      });

      console.log(`\n\n📊 Summary:`);
      console.log(`   Total violations: ${results.violations.length}`);
      console.log(`   Critical: ${results.violations.filter(v => v.impact === 'critical').length}`);
      console.log(`   Serious: ${results.violations.filter(v => v.impact === 'serious').length}`);
      console.log(`   Moderate: ${results.violations.filter(v => v.impact === 'moderate').length}`);
      console.log(`   Minor: ${results.violations.filter(v => v.impact === 'minor').length}`);
    }

    // Also check incomplete (needs review)
    if (results.incomplete.length > 0) {
      console.log(`\n⚠️  ${results.incomplete.length} elements need manual review`);
    }

    // Close JSDOM
    window.close();

  } catch (error) {
    console.error('Error running audit:', error.message);
    process.exit(1);
  }
}

runAccessibilityAudit();
