'use client';

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const AxeDevTool = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      import('@axe-core/react')
        .then((axe) => {
          axe.default(React, ReactDOM, 1000, {
            // Configuration for axe-core
            runOnly: {
              type: 'tag',
              values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
            },
            // Rules configuration
            rules: [
              // Ensure color contrast meets WCAG AA standards
              { id: 'color-contrast', enabled: true },
              // Check for proper heading hierarchy
              { id: 'heading-order', enabled: true },
              // Ensure all images have alt text
              { id: 'image-alt', enabled: true },
              // Check for proper form labels
              { id: 'label', enabled: true },
              // Ensure links have discernible text
              { id: 'link-name', enabled: true },
              // Check for proper button names
              { id: 'button-name', enabled: true },
              // Ensure proper document structure
              { id: 'region', enabled: true },
              // Check for keyboard accessibility
              { id: 'keyboard-access', enabled: true },
              // Ensure focus indicators are visible
              { id: 'focus-visible', enabled: true },
            ],
            // Result types to return
            resultTypes: ['violations', 'incomplete'],
          });

          // Log that axe-core is running
          // eslint-disable-next-line no-console
          console.log(
            '%c[axe-core] Accessibility testing enabled',
            'color: #4CAF50; font-weight: bold;'
          );
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error('[axe-core] Failed to load:', error);
        });
    }
  }, []);

  return null;
};

export default AxeDevTool;
