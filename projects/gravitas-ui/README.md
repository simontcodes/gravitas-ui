# 🎨 Gravitas UI --- Customization Guide

Gravitas UI is designed to be **themeable without modifying component
APIs**.

Components rely on Bootstrap under the hood, while Gravitas provides a
token-based design layer using CSS variables. This allows:

-   Global theming
-   Scoped branding
-   Dark mode
-   Density control
-   Enterprise consistency

------------------------------------------------------------------------

## 🌍 Preferred Approach: Override Gravitas Tokens

Gravitas exposes CSS variables (design tokens) such as:

-   `--gv-accent`
-   `--gv-bg-app`
-   `--gv-border`
-   `--gv-text`
-   `--gv-radius-md`
-   `--gv-shadow-md`
-   etc.

Overriding these keeps the system consistent and accessible.

------------------------------------------------------------------------

## 🌎 Global Theme Override (Entire App)

Add to your global stylesheet (e.g. `styles.css`):

``` css
:root {
  --gv-accent: #7c3aed;
  --gv-accent-hover: #6d28d9;
}
```

All components using `variant="primary"` (and other brand-mapped tokens)
will update automatically.

------------------------------------------------------------------------

## 🎯 Scoped Branding (Multi-Tenant / Section-Based)

You can scope overrides to a container:

``` css
.billing-scope {
  --gv-accent: #0ea5e9;
  --gv-accent-hover: #0284c7;
}
```

``` html
<div class="billing-scope">
  <gv-button variant="primary">Pay Invoice</gv-button>
</div>
```

Only components inside `.billing-scope` will use the overridden brand
color.

Ideal for:

-   White-label SaaS
-   Multi-tenant platforms
-   Feature-level branding

------------------------------------------------------------------------

## 🌗 Theme & Density Toggles

Gravitas supports global toggles using HTML attributes:

``` html
<html data-gv-theme="dark" data-gv-density="compact">
```

### 🎨 Available Theme Modes

  Attribute         Values
  ----------------- -------------------
  `data-gv-theme`   `light` \| `dark`

### 📐 Available Density Modes

  Attribute           Values
  ------------------- ------------------------------------------
  `data-gv-density`   `compact` \| `comfortable` \| `spacious`

### 📊 What Density Controls

Density affects:

-   Font size
-   Line height
-   Spacing scale
-   Button padding
-   Panel spacing
-   Layout rhythm
-   Table row height (when density-aware components are used)

### 🌙 What Theme Controls

Theme affects:

-   Surface colors
-   Text contrast
-   Borders
-   Shadows
-   Focus states

------------------------------------------------------------------------

## 🛠 Escape Hatch: Per-Component Customization

For one-off customization, use the `className` input:

``` html
<gv-button className="w-100 my-brand-btn" variant="primary">
  Custom Button
</gv-button>
```

Override Bootstrap button variables:

``` css
.my-brand-btn {
  --bs-btn-bg: #7c3aed;
  --bs-btn-border-color: #7c3aed;
  --bs-btn-hover-bg: #6d28d9;
  --bs-btn-hover-border-color: #6d28d9;
  --bs-btn-color: #fff;
}
```

This keeps customization isolated without affecting the global theme.

------------------------------------------------------------------------

## 🚫 What We Intentionally Do NOT Support

Gravitas UI does **not** support arbitrary color inputs like:

``` html
<gv-button color="#ff0000">
```

This is intentional.

Reasons:

-   Maintains visual consistency\
-   Preserves accessibility contrast\
-   Keeps dark mode predictable\
-   Prevents design drift\
-   Reduces long-term maintenance cost

If a new style is needed, extend the design system properly by:

-   Adding a new token\
-   Creating a new variant\
-   Or defining a wrapper class

------------------------------------------------------------------------

## 💡 Recommended Defaults for Enterprise Apps

For data-heavy dashboards (like Copernicus):

``` html
<html data-gv-theme="light" data-gv-density="compact">
```

  Mode            Recommended For
  --------------- ---------------------------
  `compact`       Enterprise dashboards
  `comfortable`   Admin panels
  `spacious`      Marketing / content tools

------------------------------------------------------------------------

## 🧠 Design Philosophy

Gravitas UI favors:

-   **Token-driven theming**
-   **Predictable variants**
-   **Accessibility-first design**
-   **Enterprise consistency**
-   **Low long-term maintenance**

Customization should extend the system --- not break it.


# GravitasUi

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build gravitas-ui
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/gravitas-ui
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
