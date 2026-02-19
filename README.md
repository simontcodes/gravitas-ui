# Gravitas UI

A modern, enterprise-grade Angular component library built on top of Bootstrap 5.

Gravitas provides consistent design tokens, density control, and production-ready UI components for complex SaaS applications like Copernicus and MasterBook.

---

## ✨ Philosophy

Gravitas is built with the following principles:

- **Enterprise-first**
- **Composable**
- **Bootstrap-compatible**
- **Design-token driven**
- **Density-aware**
- **Accessible by default**
- **Incrementally adoptable**

Gravitas does not replace Bootstrap — it enhances it with structure, consistency, and polish.

---

## 📦 Installation

```bash
yarn add @your-org/gravitas-ui
```

---

## 🚀 Quick Start

### 1️⃣ Import the theme

In your application entry file:

```ts
import '@your-org/gravitas-ui/styles/gravitas.css';
```

### 2️⃣ Set density + theme (optional)

```html
<html data-gv-density="compact" data-gv-theme="light">
```

Available density options:

- `compact`
- `comfortable`
- `spacious`

Available theme options:

- `light`
- `dark` (coming soon)

---

## 🎛 Density System

Gravitas supports layout density control via:

```html
data-gv-density="compact"
```

### Compact
- Tight spacing
- Data-heavy dashboards
- Billing/insurance systems

### Comfortable
- Default SaaS layout
- Balanced whitespace

### Spacious
- Marketing-heavy or admin tools

Density adjusts paddings, spacing, and sizing system-wide.

---

## 🎨 Design Tokens

Gravitas is token-driven.

Example tokens:

```css
--gv-accent
--gv-border
--gv-text-strong
--gv-radius-md
--gv-shadow-sm
```

Tokens power:

- Buttons
- Cards
- Forms
- Tables
- Future components

You can override tokens in your application to customize branding.

---

## 🧩 Components

### Button

A Bootstrap-compatible enterprise button.

#### Basic Usage

```html
<gv-button variant="primary">
  Save
</gv-button>
```

#### Variants

- `primary`
- `secondary`
- `success`
- `danger`
- `warning`
- `info`
- `light`
- `dark`
- `link`

#### Sizes

- `sm`
- `md` (default)
- `lg`

#### Full Width

```html
<gv-button [fullWidth]="true">
  Continue
</gv-button>
```

#### Loading State

```html
<gv-button [loading]="true">
  Save
</gv-button>
```

#### Loading With Text

```html
<gv-button
  [loading]="true"
  loadingText="Saving..."
>
  Save
</gv-button>
```

#### Icons

Left icon:

```html
<gv-button>
  <span gvIconLeft>💾</span>
  Save
</gv-button>
```

Right icon:

```html
<gv-button>
  Next
  <span gvIconRight>➡️</span>
</gv-button>
```

---

## 🧠 Architecture

Gravitas uses layered styling:

1. **Tokens**
2. **Theme mapping**
3. **Component-scoped CSS**
4. **Layout shell**

Bootstrap classes remain usable.

Gravitas components are opt-in and do not globally override Bootstrap components.

---

## 🔄 Versioning

Gravitas follows Semantic Versioning.

```
0.x → Rapid iteration
1.0 → Stable API
```

Breaking changes are communicated clearly in the changelog.

---

## 🛣 Roadmap

Planned components:

- Card
- Form Field
- Input
- Badge
- Dialog
- Table
- Toast

---

## 🤝 Contributing

1. Create a feature branch
2. Add Storybook stories
3. Write unit tests
4. Ensure no global Bootstrap overrides
5. Submit PR

---

## 🧪 Development

Start Storybook:

```bash
yarn storybook
```

Build library:

```bash
yarn build
```

---

## 📜 License

Private – Internal Use Only (for now)
