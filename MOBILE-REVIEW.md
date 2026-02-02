# Mobile & Cross-Browser Review – Navi-ken Website

This document summarizes the review and fixes applied so the site works well on mobile devices and across common browsers (Chrome, Safari, Firefox, Edge) and operating systems (iOS, Android, Windows, macOS).

---

## 1. Fixes Applied

### 1.1 HTML (index.html)

- **Viewport:** `viewport-fit=cover` added so the layout extends into safe areas on notched devices (e.g. iPhone X+).
- **Theme color:** `<meta name="theme-color" content="#4a5eb8">` so mobile browser chrome matches the brand.
- **PWA-style meta:** `apple-mobile-web-app-capable` and `apple-mobile-web-app-status-bar-style` for a better experience when added to the home screen on iOS.

### 1.2 CSS (styles.css)

**Layout & overflow**

- **Global images:** `img { max-width: 100%; height: auto; }` to avoid horizontal overflow on small screens.
- **Hero logo:** Replaced fixed `width: 563px` with `width: 100%; max-width: 563px` so it scales on narrow viewports.
- **Hero logo (breakpoints):** At 768px and 480px, logo uses `max-width: min(450px, 100%)` and `max-width: min(375px, 100%)` so it never overflows.
- **Prototype gallery:** `minmax(400px, 1fr)` changed to `minmax(min(100%, 400px), 1fr)` so the grid does not force horizontal scroll on phones.
- **Mission image (480px):** `max-width: 100%`, `height: auto`, `min-height: 200px`, `object-fit: contain` for flexible, proportional scaling.
- **Container (480px):** `padding: 0 16px` for slightly more space on very small screens.

**Touch targets (≈44×44 px minimum)**

- **Language button:** `min-height: 44px`, `min-width: 44px`.
- **Nav links:** `min-height: 44px` on `.nav-menu a`.
- **Waiting list button:** `min-height: 44px`, `text-align: center`, `line-height: 1.2`.
- **Contact email link:** `min-height: 44px`, `padding: 8px 0`.

**Safe areas (notched devices)**

- **Language switcher:** `top: max(20px, env(safe-area-inset-top)); left: max(20px, env(safe-area-inset-left));`
- **Floating nav:** `right: max(30px, env(safe-area-inset-right));`

**Text (English & Japanese)**

- **Mission text, mission highlight, use-case description:** `overflow-wrap: break-word; word-break: break-word;` so long words (e.g. Japanese) wrap and do not cause overflow.

**Reduced motion**

- **`@media (prefers-reduced-motion: reduce)`:** All animations and transitions are effectively disabled when the user prefers reduced motion (accessibility and OS setting).

**Other**

- **Tap highlight:** `-webkit-tap-highlight-color` set on `a` and `button` for clearer touch feedback.
- **Duplicate rule:** Removed the extra `.hazard-item { padding: 20px }` in the 768px block.
- **How-it-works (768px):** `.how-visual-item` and `.how-it-works-text` use `min-height: auto` on smaller screens so content height is natural.

### 1.3 JavaScript (script.js)

- **`html` lang:** When switching language, `document.documentElement.lang` is set to `'ja'` or `'en'` so screen readers and browser translation use the correct language.
- **Scroll listener:** `window.addEventListener('scroll', highlightActiveSection, { passive: true })` for better scroll performance on mobile.
- **Section visibility:** Sections below the fold are initially hidden for the scroll animation; sections in the initial viewport stay visible so the page does not load with a blank hero.

### 1.4 Signup page (signup.html)

- **Viewport & theme:** Same `viewport-fit=cover` and `theme-color` as the main site.
- **Body padding:** Uses `max(20px, env(safe-area-inset-*))` so content is not hidden by notches or system UI.
- **Mobile height:** `min-height: -webkit-fill-available` to improve behavior on iOS when the address bar shows/hides.
- **Gradient:** Aligned with main site colors (`#4a5eb8`, `#5a3d7a`).
- **Submit button:** `min-height: 44px` for a proper touch target.
- **Back link:** `min-height: 44px`, `line-height: 44px` for easier tapping.
- **Responsive padding:** At 600px, container `padding: 24px 16px`; at 380px, body and container padding reduced further.

---

## 2. What to Test Manually

### 2.1 Devices & viewports

- **Phones:** 320px, 375px, 390px, 414px width (portrait).
- **Tablets:** 768px, 1024px (portrait and landscape).
- **Browsers:** Safari (iOS), Chrome (Android), Chrome/Safari/Firefox/Edge (desktop).

### 2.2 Checklist

- [ ] No horizontal scrolling at any viewport width.
- [ ] Language switcher (EN/JA) works and `lang` updates; Japanese text wraps and does not overflow.
- [ ] Mission image switches correctly for EN/JA and scales on resize.
- [ ] All nav links, language button, “Sign up for waiting list”, and contact email are easy to tap (no tiny hit areas).
- [ ] On notched phones, fixed elements (lang switcher, floating nav) are not hidden by the notch or status bar.
- [ ] Signup form: inputs use at least 16px font-size (no unwanted zoom on focus in iOS), submit and “Back to home” are easy to tap.
- [ ] With “Reduce motion” enabled (OS or browser), animations are reduced or off and the site remains usable.

### 2.3 If you see issues

- **Layout/overflow:** Note the section (e.g. hero, use cases, prototype), viewport width, and device/browser.
- **Language:** Note whether it happens in EN or JA and which text (e.g. mission, use-case description).
- **Console:** If something only fails on mobile, open Developer Tools (e.g. Chrome remote debugging, Safari Web Inspector) and share any errors or warnings from the Console tab.

---

## 3. Browser & OS Support (Summary)

- **Flexbox/Grid:** Used throughout; supported in all modern browsers and mobile OS versions you target.
- **`env(safe-area-inset-*)`:** Supported in iOS 11.2+ and Android with notches; other browsers ignore it safely.
- **`prefers-reduced-motion`:** Supported in current Chrome, Safari, Firefox, Edge; older browsers simply keep animations.
- **`passive: true`:** Supported where needed for scroll performance; unsupported browsers ignore the option.

No polyfills were added; the site is built for current and recent versions of the main browsers and mobile OSes.
