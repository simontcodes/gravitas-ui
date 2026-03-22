import type { Meta, StoryObj } from '@storybook/angular';
import { Component, Input, inject } from '@angular/core';
import { Toasts } from './toasts';
import { ToastService } from './toasts.service';
import { ToastPosition } from './toast.model';
import { Button } from '../../components/button/button';

@Component({
  selector: 'gv-toast-demo',
  standalone: true,
  imports: [Toasts, Button],
  template: `
    <div class="p-3 d-flex flex-wrap gap-2">
      <gv-button variant="success" (click)="success()">Success</gv-button>
      <gv-button variant="danger" (click)="error()">Error (sticky)</gv-button>
      <gv-button variant="info" (click)="info()">Info</gv-button>
    </div>

    <div class="px-3 pb-3" style="max-width: 720px;">
      <div class="small text-muted mb-2"><strong>Toast theming tokens</strong></div>
      <pre
        style="margin: 0; padding: 12px; border-radius: 12px; background: #0f172a; color: #e2e8f0; font-size: 12px; overflow: auto;"
      ><code>{{ tokenExample }}</code></pre>
    </div>

    <gv-toasts></gv-toasts>
  `,
})
class ToastDemo {
  private toast = inject(ToastService);

  @Input() position: ToastPosition = 'top-end';

  readonly tokenExample = `:root {
  --gv-toast-bg: #ffffff;
  --gv-toast-border: #e2e8f0;
  --gv-toast-color: #1f2937;
  --gv-toast-title-color: #0f172a;
  --gv-toast-close-color: #64748b;
  --gv-toast-close-hover-color: #0f172a;

  /* Optional per-variant overrides */
  --gv-toast-success-bg: #ecfdf5;
  --gv-toast-danger-bg: #fef2f2;
  --gv-toast-warning-bg: #fffbeb;
  --gv-toast-info-bg: #f0f9ff;
}`;

  success() {
    this.toast.show({
      variant: 'success',
      title: 'Saved',
      message: 'Claim updated successfully.',
      position: this.position,
    });
  }

  error() {
    this.toast.show({
      variant: 'danger',
      title: 'Validation error',
      message: 'Password must be at least 8 characters long.',
      position: this.position,
      durationMs: 0,
      ariaLive: 'assertive',
    });
  }

  info() {
    this.toast.show({
      variant: 'info',
      title: 'Sync',
      message: 'Posting to EDI gateway…',
      position: this.position,
    });
  }
}

const meta: Meta<ToastDemo> = {
  title: 'Gravitas/Toast',
  component: ToastDemo,
  tags: ['autodocs'],
  args: { position: 'top-end' },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-end',
        'top-start',
        'top-center',
        'bottom-end',
        'bottom-start',
        'bottom-center',
      ],
      description: 'Screen position where new toasts appear.',
      table: {
        category: 'Behavior',
        defaultValue: { summary: 'top-end' },
      },
    },
  },
  decorators: [
    (story) => ({
      ...story(),
      moduleMetadata: {
        providers: [ToastService],
      },
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Toasts provide lightweight, temporary feedback for app events such as saves, sync updates, and validation errors.

### Features
- Position control via \`ToastPosition\`
- Variants for semantic feedback
- Auto-dismiss or sticky mode
- Themeable with CSS variables

### CSS Variables
- \`--gv-toast-bg\`
- \`--gv-toast-border\`
- \`--gv-toast-color\`
- \`--gv-toast-title-color\`
- \`--gv-toast-close-color\`
- \`--gv-toast-close-hover-color\`

### Optional per-variant background overrides
- \`--gv-toast-primary-bg\`
- \`--gv-toast-success-bg\`
- \`--gv-toast-warning-bg\`
- \`--gv-toast-danger-bg\`
- \`--gv-toast-info-bg\`
- \`--gv-toast-dark-bg\`
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<ToastDemo>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: `
Use the buttons to trigger example toasts. Change the \`position\` control to verify placement behavior.

\`\`\`ts
this.toast.show({
  variant: 'success',
  title: 'Saved',
  message: 'Claim updated successfully.',
  position: 'bottom-end',
});
\`\`\`

To customize toast colors, override the exposed CSS variables in your app theme.
        `.trim(),
      },
    },
  },
};
