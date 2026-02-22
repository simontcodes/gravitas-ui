import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Gravitas/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    type: 'button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    loadingText: '',
    className: '',
  },
  argTypes: {
    // Appearance
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark',
        'link',
      ],
      description: 'Visual style variant.',
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size.',
      table: { category: 'Appearance', defaultValue: { summary: 'md' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Makes the button span the full width of its container.',
      table: { category: 'Layout', defaultValue: { summary: 'false' } },
    },

    // Behavior
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Native button type attribute.',
      table: { category: 'Behavior', defaultValue: { summary: 'button' } },
    },

    // State
    disabled: {
      control: 'boolean',
      description: 'Disables the button.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows a busy state (spinner) and disables the button.',
      table: { category: 'State', defaultValue: { summary: 'false' } },
    },
    loadingText: {
      control: 'text',
      description: 'Optional label shown while loading. If empty, shows normal content.',
      table: { category: 'State', defaultValue: { summary: '' } },
    },

    // Advanced
    className: {
      control: 'text',
      description: 'Extra CSS classes applied to the underlying button (Bootstrap utilities, etc).',
      table: { category: 'Advanced', defaultValue: { summary: '' } },
    },
  },
  parameters: {
    docs: {
      // Note: excludeDecorators only affects Source, not rendered story blocks.
      source: { excludeDecorators: true },
      description: {
        component: `
Buttons support loading states and optional left/right icon slots via content projection.

### Usage
\`\`\`html
<gv-button variant="primary">Button</gv-button>
<gv-button [loading]="true" loadingText="Saving...">Save</gv-button>
\`\`\`

### Slots
- \`[gvIconLeft]\`: left icon slot
- default slot: label/content
- \`[gvIconRight]\`: right icon slot

### Accessibility
- \`aria-busy="true"\` is applied while \`loading\` is true.
- Button is disabled while loading to prevent duplicate submissions.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<Button>;

function baseTemplate(label = 'Button') {
  return `
    <gv-button
      [type]="type"
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [fullWidth]="fullWidth"
      [loadingText]="loadingText"
      [className]="className"
    >
      ${label}
    </gv-button>
  `;
}

function renderButton(args: Button, label = 'Button') {
  return {
    props: args,
    template: baseTemplate(label),
  };
}

export const Primary: Story = {
  render: (args) => renderButton(args, 'Button'),
  parameters: {
    docs: {
      description: {
        story: `
Basic button.

\`\`\`html
<gv-button variant="primary">Button</gv-button>
\`\`\`
        `.trim(),
      },
    },
  },
};

export const Loading: Story = {
  args: { loading: true },
  render: (args) => renderButton(args, 'Button'),
  parameters: {
    docs: {
      description: {
        story: `
Loading state shows a spinner and disables the button.

\`\`\`html
<gv-button [loading]="true">Button</gv-button>
\`\`\`
        `.trim(),
      },
    },
  },
};

export const LoadingWithText: Story = {
  args: { loading: true, loadingText: 'Saving...' },
  render: (args) => renderButton(args, 'Save'),
  parameters: {
    docs: {
      description: {
        story: `
Loading state with custom text.

\`\`\`html
<gv-button [loading]="true" loadingText="Saving...">Save</gv-button>
\`\`\`
        `.trim(),
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => renderButton(args, 'Button'),
  parameters: {
    docs: {
      description: {
        story: `
Disabled state.

\`\`\`html
<gv-button [disabled]="true">Button</gv-button>
\`\`\`
        `.trim(),
      },
    },
  },
};

/**
 * FullWidth:
 * - Canvas: wrapped in a max-width shell so you can see the fullWidth behavior in a constrained container.
 * - Docs: NO wrapper at all (neither in render nor source).
 */
export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => renderButton(args, 'Button'),
  decorators: [
    (storyFn: any, context: any) => {
      const story = storyFn();

      // ✅ Do not show the wrapper anywhere in Docs
      if (context?.viewMode === 'docs') return story;

      // ✅ Only wrap in Canvas
      return {
        ...story,
        template: `
          <div style="max-width: 480px;">
            ${story.template}
          </div>
        `,
      };
    },
  ],
  parameters: {
    docs: {
      // ✅ ensures the source snippet never includes the wrapper
      source: { excludeDecorators: true },
      description: {
        story: `
Full width button (useful in narrow layouts and mobile).

\`\`\`html
<gv-button [fullWidth]="true">Button</gv-button>
\`\`\`
        `.trim(),
      },
    },
  },
};

export const LeftIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
      <gv-button
        [type]="type"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        [loadingText]="loadingText"
        [className]="className"
      >
        <span gvIconLeft aria-hidden="true">💾</span>
        Save
      </gv-button>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Left icon slot using \`[gvIconLeft]\`.

\`\`\`html
<gv-button>
  <span gvIconLeft aria-hidden="true">💾</span>
  Save
</gv-button>
\`\`\`
        `.trim(),
      },
    },
  },
};

export const RightIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
      <gv-button
        [type]="type"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        [loadingText]="loadingText"
        [className]="className"
      >
        Next
        <span gvIconRight aria-hidden="true">➡️</span>
      </gv-button>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Right icon slot using \`[gvIconRight]\`.

\`\`\`html
<gv-button>
  Next
  <span gvIconRight aria-hidden="true">➡️</span>
</gv-button>
\`\`\`
        `.trim(),
      },
    },
  },
};

export const LeftAndRightIcons: Story = {
  render: (args) => ({
    props: args,
    template: `
      <gv-button
        [type]="type"
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        [loadingText]="loadingText"
        [className]="className"
      >
        <span gvIconLeft aria-hidden="true">🔎</span>
        Search
        <span gvIconRight aria-hidden="true">⌘K</span>
      </gv-button>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: `
Both icon slots.

\`\`\`html
<gv-button>
  <span gvIconLeft aria-hidden="true">🔎</span>
  Search
  <span gvIconRight aria-hidden="true">⌘K</span>
</gv-button>
\`\`\`
        `.trim(),
      },
    },
  },
};
