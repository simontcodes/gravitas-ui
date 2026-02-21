import type { Meta, StoryObj } from '@storybook/angular';
import { Component, Input, inject } from '@angular/core';
import { Toasts } from './toasts';
import { ToastService } from './toasts.service';
import { ToastPosition } from './toast.model';
import { Button } from '../button/button';

@Component({
  selector: 'gv-toast-demo',
  standalone: true,
  imports: [Toasts, Button],
  template: `
    <div class="p-3 d-flex gap-2">
      <gv-button variant="success" (click)="success()">Success</gv-button>
      <gv-button variant="danger" (click)="error()">Error (sticky)</gv-button>
      <gv-button variant="info" (click)="info()">Info</gv-button>
    </div>

    <gv-toasts></gv-toasts>
  `,
})
class ToastDemo {
  private toast = inject(ToastService);

  @Input() position: ToastPosition = 'top-end';

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
    },
  },
  decorators: [
    (story) => ({
      ...story(),
      moduleMetadata: {
        providers: [ToastService], // ✅ single instance shared by demo + <gv-toasts>
      },
    }),
  ],
};

export default meta;
type Story = StoryObj<ToastDemo>;

export const Playground: Story = {};
