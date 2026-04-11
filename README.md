# Gravitas UI

Gravitas UI is an Angular standalone component library for Bootstrap-based
enterprise applications.

This repository contains the component package, design tokens, Storybook
documentation, and packaging configuration used to publish the library.

Current planned public release: `0.1.0`.

## Repository Tooling

This repository is standardized on Yarn 4.

Use:

```bash
corepack enable
yarn install
```

Do not commit `package-lock.json`. The authoritative lockfile for this
repository is `yarn.lock`.

## Package Positioning

Gravitas is designed for applications that already use Bootstrap as part of
their shell and layout environment.

The intended layering is:

- Bootstrap provides the baseline application environment
- Gravitas provides the design-system contract
- Applications consume Gravitas components instead of reimplementing UI patterns

Gravitas is therefore Bootstrap-aligned, not Bootstrap-agnostic.

## Package Contract

Consumer applications should:

1. install `gravitas-ui` and `bootstrap`
2. import Bootstrap once globally
3. import `gravitas-ui/styles/gravitas.css` once globally
4. optionally set `data-gv-theme` and `data-gv-density` at the app shell level

## Installation

```bash
yarn add gravitas-ui bootstrap
```

Minimum supported Angular peer line for publication: `21.2.4+`.

## Global Setup

```ts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'gravitas-ui/styles/gravitas.css';
```

Example root theme configuration:

```html
<html data-gv-theme="light" data-gv-density="comfortable">
```

## Development

Start Storybook:

```bash
yarn storybook
```

Build the library:

```bash
yarn build
```

Run tests:

```bash
yarn test --watch=false
```

Build Storybook:

```bash
yarn build-storybook
```

## Publishing

The publishable package is built into [`dist/gravitas-ui`](/home/simontang/projects/gravitas-ui/dist/gravitas-ui).

Recommended flow:

```bash
yarn build
cd dist/gravitas-ui
npm publish
```

Release notes for the initial public release are captured in
[CHANGELOG.md](/home/simontang/projects/gravitas-ui/CHANGELOG.md).

## Security

Before publishing, verify runtime dependencies are outside known vulnerable
ranges. In this repository, Angular package ranges have been raised to the
patched `21.2.4+` line after `npm audit` reported high-severity Angular XSS
advisories against the earlier `21.1.x` and early `21.2.x` ranges.

Use [SECURITY.md](/home/simontang/projects/gravitas-ui/SECURITY.md) as the
disclosure policy for the public package and repository.

## License

This repository is now prepared for public distribution under the MIT license.
See [LICENSE](/home/simontang/projects/gravitas-ui/LICENSE).
