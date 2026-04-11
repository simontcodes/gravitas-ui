# Gravitas UI

Gravitas UI is an Angular standalone component library for Bootstrap-based
enterprise applications.

Current public package version target: `0.1.0`.

It is designed for company applications that already use Bootstrap for baseline
layout and measurements, while Gravitas provides the design-system layer:
tokens, themes, density, and reusable components.

## What Gravitas Is

- Angular standalone components for application UI
- Gravitas-owned visual language on top of Bootstrap-compatible foundations
- Token-driven theming for company branding and consistency
- Designed for dense dashboard and admin-style interfaces

## Runtime Contract

Gravitas expects a Bootstrap 5 application shell.

Consumer applications should:

1. Install Gravitas and its peer dependencies
2. Load Bootstrap CSS once at the app shell level
3. Load Gravitas CSS once at the app shell level
4. Optionally set Gravitas theme and density attributes globally

## Installation

```bash
yarn add gravitas-ui bootstrap
```

If the consuming application uses another package manager, install the same
package set with that tool. The Gravitas repository itself is standardized on
Yarn 4.

Required peer dependencies:

- `@angular/common` `21.2.4+`
- `@angular/core` `21.2.4+`
- `@angular/forms` `21.2.4+`
- `bootstrap`

## Global Styles

Import Bootstrap and Gravitas once in your application's global styles or main
entrypoint:

```ts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'gravitas-ui/styles/gravitas.css';
```

`gravitas.css` includes the Gravitas token and theme layers.

Bootstrap remains part of the supported runtime environment. Gravitas is
intentionally built for Bootstrap-based applications rather than as a Bootstrap
replacement.

## Theme And Density

Gravitas supports global theme and density toggles through root attributes:

```html
<html data-gv-theme="light" data-gv-density="comfortable">
```

Supported theme values:

- `light`
- `dark`

Supported density values:

- `compact`
- `comfortable`
- `spacious`

## Usage

Import standalone components from the package:

```ts
import { Button, InputComponent, Tabs } from 'gravitas-ui';
```

Example:

```ts
import { Component } from '@angular/core';
import { Button } from 'gravitas-ui';

@Component({
  standalone: true,
  selector: 'app-save-action',
  imports: [Button],
  template: `<gv-button variant="primary">Save</gv-button>`,
})
export class SaveActionComponent {}
```

## Styling Model

Gravitas follows a Bootstrap-aligned contract:

- Bootstrap provides the baseline application environment
- Gravitas tokens define color, spacing, density, radius, and elevation
- Gravitas component styles define the actual UI identity and state behavior

Consumers should prefer Gravitas components and Gravitas token overrides over
direct restyling of component internals.

## Token Customization

Customize Gravitas through CSS variables instead of changing component APIs:

```css
:root {
  --gv-accent: #0f6cbd;
  --gv-accent-hover: #0b5aa0;
}
```

For scoped branding:

```css
.billing-scope {
  --gv-accent: #0ea5e9;
  --gv-accent-hover: #0284c7;
}
```

## Supported Integration Pattern

Gravitas is intended to be integrated at the application shell level.

Recommended:

- Bootstrap CSS imported once globally
- Gravitas CSS imported once globally
- Theme and density controlled from the app shell
- Feature components import only the standalone components they use

Avoid:

- importing Bootstrap repeatedly in feature code
- overriding Gravitas internals ad hoc per app
- mixing one-off Bootstrap markup variants where Gravitas components already
  exist

## Documentation

Storybook is the source of truth for:

- supported components
- component states and examples
- foundations and design tokens
- recommended usage patterns

For AI-assisted migrations, the package also includes:

- `ai/gravitas-component-migration.md`

That document is written as an execution spec for agents replacing existing app
components with Gravitas equivalents.

## Building

```bash
yarn build
```

The built package is output to `dist/gravitas-ui`.

## Publishing

Build the library first, then publish from the generated package directory:

```bash
yarn build
cd dist/gravitas-ui
npm publish
```

Package release notes are included in the bundled `CHANGELOG.md`.

## Security

Gravitas should only be published against Angular peer ranges outside known
vulnerable lines. The package metadata in this repository now targets the
patched Angular `21.2.4+` line.

Security disclosures should follow the policy in `SECURITY.md` included in the
published package.

## License

Gravitas UI is prepared for public distribution under the MIT license. See the
bundled `LICENSE` file in the published package root.
