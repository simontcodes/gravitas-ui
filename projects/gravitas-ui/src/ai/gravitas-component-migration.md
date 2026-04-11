# Gravitas UI Component Migration Spec For AI Agents

This document is intended for an AI agent that is modifying an Angular
application to replace existing UI controls with Gravitas UI components.

Use this as an execution contract, not as general product documentation.

## Objective

Replace application-level UI primitives and repeated Bootstrap-based component
markup with Gravitas UI components, while preserving behavior, forms
integration, accessibility, and application-specific business logic.

The target library is `gravitas-ui`, an Angular standalone component library
for Bootstrap-based enterprise applications.

## Required Runtime Assumptions

Before replacing any components, confirm all of the following:

1. The target application is an Angular application.
2. The target application can consume standalone Angular components.
3. The target application can install the following packages:
   - `gravitas-ui`
   - `bootstrap`
4. The application shell can load global CSS exactly once.

If any of these are false, stop and report the constraint instead of applying a
partial migration.

## Required Package And Global Setup

The consumer application must have these runtime dependencies:

- `@angular/common`
- `@angular/core`
- `@angular/forms`
- `bootstrap`
- `gravitas-ui`

The application must load these global styles once at the shell level:

```ts
import 'bootstrap/dist/css/bootstrap.min.css';
import 'gravitas-ui/styles/gravitas.css';
```

Optional shell-level theming:

```html
<html data-gv-theme="light" data-gv-density="comfortable">
```

Do not migrate components if Gravitas CSS is not loaded globally. Many Gravitas
components intentionally depend on shared token and theme layers.

## Migration Principles

Apply these rules consistently:

1. Replace repeated UI patterns with Gravitas components, not one-off markup.
2. Preserve application behavior before optimizing implementation details.
3. Preserve bindings, event handlers, validators, and reactive-form wiring.
4. Prefer Gravitas component APIs over carrying forward Bootstrap utility markup
   inside component internals.
5. Keep layout utilities only when they are application-layout concerns, not
   component concerns.
6. Do not rewrite unrelated business logic while migrating markup.
7. Do not assume there is a Gravitas replacement for every custom widget.
8. Leave unsupported or highly bespoke controls in place and report them.

## Safe Migration Order

Migrate in this order to reduce risk:

1. Global setup and imports
2. Buttons and icon actions
3. Text inputs and textareas
4. Selects, checkboxes, radios, and switches
5. Alerts, badges, avatars, dividers, loaders, and empty states
6. Cards and simple overlays
7. Tabs and tables
8. Dropdowns and tooltips
9. Cleanup of old local component wrappers and dead styles

## Standalone Imports

Import only the Gravitas symbols actually used by a given Angular component.

Primary exports:

- `Button`
- `IconButton`
- `InputComponent`
- `Select`
- `Textarea`
- `Checkbox`
- `Radio`
- `Switch`
- `FormField`
- `Card`
- `Modal`
- `Tabs`
- `TabList`
- `Tab`
- `TabPanels`
- `TabPanel`
- `Table`
- `Dropdown`
- `DropdownTriggerDirective`
- `DropdownMenuDirective`
- `Badge`
- `Alert`
- `Avatar`
- `Divider`
- `Loader`
- `Skeleton`
- `Empty`
- `Toasts`
- `ToastService`
- `GvTooltipDirective`
- `GvTooltipPanelComponent`

Example:

```ts
import { Button, InputComponent, Select } from 'gravitas-ui';
```

Do not import the entire library into every feature component if only one or
two components are needed.

## Component Replacement Map

Use this mapping as the default replacement strategy.

### Buttons

Replace these patterns with `gv-button`:

- `<button class="btn ...">`
- `<a class="btn ...">` used as an action trigger
- local wrapper components that only normalize button variants

Typical migration:

```html
<button class="btn btn-primary" (click)="save()">Save</button>
```

to:

```html
<gv-button variant="primary" (click)="save()">Save</gv-button>
```

Map semantics carefully:

- preserve `type="submit"` on form submit actions
- preserve `disabled`
- map loading states to `loading`
- map full-width button wrappers to `fullWidth`

Use `gv-icon-button` for icon-only actions instead of a naked Bootstrap button
with an icon child.

### Text Inputs

Replace standard text-like controls with `gv-input`:

- `<input class="form-control">`
- local text-input wrapper components
- form fields with helper or error text manually rendered below the input

Preserve:

- `formControl`, `formControlName`, or `ngModel`
- `type`
- `placeholder`
- `readonly`
- `required`
- `disabled`
- `id`
- validation messaging

Use component inputs instead of separate surrounding markup where possible:

- `label`
- `hint` or `helperText`
- `error`

If the field uses prefix or suffix UI, prefer `gv-input` with the component's
supported affix pattern rather than recreating `input-group` markup.

### Textareas

Replace `<textarea class="form-control">` patterns with `gv-textarea`.

Preserve:

- `rows`
- `placeholder`
- `readonly`
- `required`
- `disabled`
- form bindings
- character count logic when present

Use the Gravitas props for field-level copy:

- `label`
- `description`
- `helperText`
- `error`
- `maxLength`

### Selects

Replace native or custom select wrappers with `gv-select` when the behavior is
within the existing Gravitas component contract.

Use `gv-select` for:

- simple native selects
- single-select dropdowns
- multi-selects already modeled as option arrays

Do not force migration if the existing control has advanced async search,
virtual scrolling, grouped keyboard behavior, or highly custom rendering that
Gravitas does not currently support.

Preserve:

- selected value binding
- option identity
- placeholder text
- disabled state
- validation state

### Checkboxes, Radios, And Switches

Replace these with Gravitas field primitives:

- `<input type="checkbox">` -> `gv-checkbox`
- `<input type="radio">` -> `gv-radio`
- settings toggles -> `gv-switch`

Preserve:

- form bindings
- `name`
- `required`
- `disabled`
- helper and error messaging

Prefer `gv-switch` only for true binary toggle semantics. Do not replace
acknowledgement checkboxes with switches.

### Form Shells

Use `gv-form-field` only when you need a shared field shell around a control
that is not already self-rendering.

Do not wrap Gravitas self-rendering controls in `gv-form-field` if the control
already supports:

- `label`
- `description`
- `helperText`
- `error`

This includes `gv-input`, `gv-select`, `gv-textarea`, `gv-checkbox`,
`gv-radio`, and `gv-switch`.

### Cards

Replace ad hoc card shells or Bootstrap cards with `gv-card` when the card is a
content container rather than a highly custom page layout region.

Use Gravitas card inputs for:

- `title`
- `subtitle`
- `interactive`
- `disabled`
- `fullHeight`

Keep application layout wrappers outside the card.

### Alerts

Replace inline alert banners with `gv-alert`.

Map status tone to `variant`:

- success
- warning
- danger
- info
- neutral if needed

Preserve dismiss behavior using the component's `dismissible` input and
`dismissed` output.

### Badges

Replace status pills and counters with `gv-badge`.

Use the component API instead of carrying over manual utility classes for:

- semantic tone
- size
- pill treatment
- dot treatment

### Tabs

Replace ad hoc tab implementations with the Gravitas tab primitives:

```html
<gv-tabs [(value)]="activeTab">
  <gv-tab-list>
    <gv-tab value="overview">Overview</gv-tab>
    <gv-tab value="activity">Activity</gv-tab>
  </gv-tab-list>
  <gv-tab-panels>
    <gv-tab-panel value="overview">...</gv-tab-panel>
    <gv-tab-panel value="activity">...</gv-tab-panel>
  </gv-tab-panels>
</gv-tabs>
```

Use `value` as the canonical selected-tab state. Do not try to preserve custom
CSS-only tab state hacks.

### Tables

Replace repeated admin table wrappers with `gv-table` when the screen fits the
library's table model: column config, row data, client-side filtering, loading,
empty state, and pagination.

Do not automatically migrate:

- deeply custom row templates
- server-driven virtualized grids
- tree tables
- row grouping systems
- drag-and-drop grid interactions

Those require a deliberate design decision.

### Modal

Replace simple Bootstrap modal wrappers with `gv-modal` when the interaction is
a standard dialog flow. Preserve open state, close handlers, focus management
expectations, and action buttons.

Do not auto-migrate complex workflow modals without checking that Gravitas
supports the required composition.

### Dropdown

Use `gv-dropdown` with the Gravitas trigger and menu directives for standard
action menus.

Do not replace feature-rich menu systems blindly if they depend on unsupported
keyboard or nested-menu behavior.

### Tooltip

Replace title-attribute or ad hoc tooltip logic with the Gravitas tooltip
directive when behavior is simple and local:

```html
<button [gvTooltip]="'Refresh data'">...</button>
```

Preserve placement and trigger behavior where supported.

### Empty, Loader, Skeleton, Avatar, Divider, Toasts

These should replace repeated presentational patterns when the app currently
duplicates them:

- empty state sections -> `gv-empty`
- inline or overlay loading indicators -> `gv-loader`
- placeholder loading blocks -> `gv-skeleton`
- user initials/photo chips -> `gv-avatar`
- decorative section separators -> `gv-divider`
- application toast container and notifications -> `gv-toasts` + `ToastService`

## Form Integration Rules

Gravitas field controls are designed to work with Angular forms.

When migrating forms:

1. Preserve `formControlName`, `[formControl]`, or `[(ngModel)]`.
2. Preserve validators and async validators.
3. Preserve touched, dirty, and disabled behavior.
4. Move error display into component inputs where possible.
5. Do not duplicate error text below a Gravitas control after migration.

If an existing wrapper component contains form logic beyond rendering, migrate
that logic carefully before deleting the wrapper.

## Accessibility Rules

During migration, preserve or improve:

- explicit labels
- `id` and `for` relationships
- disabled semantics
- button types
- keyboard focus order
- aria-labels for icon-only actions

If the old implementation relied on placeholder text as a label, convert it to
a real label during migration where possible.

## Bootstrap Rules

Bootstrap is still part of the supported runtime environment.

Keep Bootstrap for:

- grid and layout utilities
- spacing utilities at page-layout level
- app shell structure already built on Bootstrap

Remove or reduce Bootstrap when it is being used to fake component styling,
such as:

- `btn`, `btn-*`
- `form-control`
- `form-select`
- `input-group`
- repeated badge or alert utility combinations

The migration target is not "remove Bootstrap". The target is "stop building
application components out of raw Bootstrap primitives when Gravitas already
owns that pattern".

## What Not To Auto-Replace

Stop and report instead of guessing if you encounter:

- third-party data grids
- date pickers without a Gravitas equivalent
- autocomplete or typeahead widgets with async behavior
- rich text editors
- multi-step workflow modals with embedded routing logic
- controls with custom keyboard interaction contracts
- components with strong brand or product-specific rendering requirements

Only replace these if the library has an explicit supported equivalent or the
user asks for a custom migration.

## Refactor Cleanup After Replacement

After successful component migration, clean up:

- dead local wrapper components
- obsolete Bootstrap component classes
- duplicated helper/error markup
- redundant SCSS written only to restyle Bootstrap controls
- no-longer-used imports

Do not delete application-specific layout or business styling that remains
relevant.

## Expected Output From The AI Agent

When completing a migration, report:

1. Which screens or components were migrated
2. Which Gravitas components were introduced
3. Which legacy wrappers or styles were removed
4. Which controls were intentionally left unmigrated
5. Any required follow-up work, especially unsupported widgets

## Minimal Success Criteria

A migration is considered successful only if:

1. The application still builds
2. Forms still work
3. Existing user flows still work
4. Gravitas global CSS is loaded correctly
5. Replaced components use Gravitas imports and APIs directly
6. Old Bootstrap component styling markup has been materially reduced

If these criteria are not met, do not present the migration as complete.
