# Accessibility Issues Report - Animanga 2025 Design System

## 🚨 Critical Issues

### 1. **Color Contrast Problems**

#### Text on backgrounds

- ❌ Yellow (#ffd64d) on dark navy (#050816): Ratio ~8.5:1 ✓ (PASSES but could be better)
- ❌ Text on gradients: Variable contrast, can fail WCAG AA
- ❌ Links yellow on various backgrounds: Need verification
- ⚠️ Text-gradient with transparent fill: Accessibility concern

#### Buttons

- ❌ White text on Teal (#16e0bd): Ratio ~2.4:1 (FAILS WCAG AA - needs 4.5:1)
- ❌ White text on Pink (#ff5ed9): Ratio ~3.7:1 (FAILS WCAG AA)
- ❌ White text on Yellow (#ffd64d): Ratio ~1.4:1 (FAILS severely)

#### Form inputs

- ⚠️ Placeholder color may be too light
- ⚠️ Border rgba($yellow, 0.2) may be too subtle

### 2. **Animation Accessibility**

#### Infinite animations without pause

- ❌ `float` animation (8s infinite) - No pause control, can cause motion sickness
- ❌ `gradient-shift` animation (8s infinite) - No pause control
- ❌ Animations in Hero component always run
- ⚠️ `prefers-reduced-motion` exists but animations may still be too aggressive

#### Timing issues

- ⚠️ Some animations are too fast (0.15s may be too quick)
- ⚠️ Stagger animations may overwhelm users

### 3. **Focus State Issues**

#### Insufficient visibility

- ❌ Yellow outline on yellow backgrounds: Poor contrast
- ❌ 2px outline may be too thin
- ⚠️ Focus-visible on buttons may not be clear enough on colored backgrounds

#### Missing focus styles

- ⚠️ Scrollbar has no keyboard accessibility
- ⚠️ Some interactive elements may lack focus-visible

### 4. **Typography Issues**

#### Text gradient accessibility

- ❌ `-webkit-text-fill-color: transparent` breaks text selection
- ❌ May not work correctly with screen readers
- ❌ May cause issues with browser zoom

#### Font sizes

- ⚠️ Text-xs (12px) may be too small for some users
- ⚠️ Heading sizes may be too large on mobile (64px)

### 5. **Semantic HTML Issues**

#### Buttons

- ⚠️ AuthButtons are `<a>` tags styled as buttons - should be `<button>` or have role="button"
- ⚠️ Missing ARIA labels on icon-only buttons (if any)

#### Links

- ❌ Links with only underline animation on hover may not be discoverable
- ⚠️ "color: inherit" in AuthButtons removes link semantics

### 6. **Form Accessibility**

#### Labels and inputs

- ⚠️ Placeholders may be used as labels (anti-pattern)
- ⚠️ Form validation errors may not be announced
- ⚠️ Required fields may not be properly marked

#### Input styling

- ⚠️ Border contrast may be insufficient (rgba yellow 0.2)
- ⚠️ Focus state may not be clear enough

### 7. **Keyboard Navigation**

#### Tab order

- ⚠️ Complex layouts may have incorrect tab order
- ⚠️ Skip links may be missing
- ⚠️ Trapped focus in modals (if any)

#### Interactive elements

- ⚠️ Some elements with hover states may not be keyboard accessible
- ⚠️ Gradient backgrounds with floating animations may distract

## ⚠️ Medium Priority Issues

### 8. **Touch Target Sizes**

- ✓ Buttons have min-height 48px (good)
- ⚠️ Some links may be too small
- ⚠️ Footer links may have insufficient spacing

### 9. **Screen Reader Issues**

- ⚠️ Animations may announce incorrectly
- ⚠️ Gradient text may not be readable
- ⚠️ SR-only class exists but may not be used consistently

### 10. **Motion Sensitivity**

- ❌ Infinite animations by default
- ❌ Background gradients shift continuously
- ❌ Floating elements may cause nausea
- ⚠️ `prefers-reduced-motion` reduces but doesn't eliminate motion

## 📝 Recommendations Priority

### Must Fix (WCAG A/AA Failures)

1. Fix button text contrast (teal, pink, yellow buttons)
2. Provide pause/stop for infinite animations
3. Improve prefers-reduced-motion implementation
4. Fix text-gradient accessibility issues
5. Fix AuthButtons semantics (a vs button)
6. Improve focus state contrast and visibility

### Should Fix (Best Practices)

7. Add skip links
8. Verify all form labels
9. Improve border contrast on inputs
10. Add ARIA labels where needed
11. Test with screen readers
12. Reduce animation intensity

### Nice to Have (UX Improvements)

13. Provide theme toggle (reduce eye strain)
14. Add font size controls
15. Improve responsive text sizing
16. Add more spacing in footer links

## 🔧 Files Requiring Changes

1. `/src/app/_colors.scss` - Adjust color values for better contrast
2. `/src/app/global.scss` - Fix animations, focus states
3. `/src/app/_mixins.scss` - Fix button contrast, text-gradient
4. `/src/app/[locale]/features/Home/Hero/Hero.scss` - Fix infinite animations
5. `/src/app/[locale]/features/Home/AuthButtons/AuthButtons.scss` - Fix contrast and semantics
6. `/src/app/[locale]/features/Home/AuthButtons/AuthButtons.jsx` - Change `<a>` to `<button>`

## 🎯 WCAG Compliance Target

Current: **Fails WCAG AA**
Target: **WCAG AA Compliance**

- Contrast: 4.5:1 for normal text, 3:1 for large text
- Keyboard: All functionality available via keyboard
- Motion: Respect prefers-reduced-motion
- Focus: Clear and visible focus indicators
