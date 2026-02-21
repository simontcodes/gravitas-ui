import type { Meta, StoryObj } from '@storybook/angular';
import { Modal } from './modal';
import { Button } from '../button/button';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

type ModalArgs = {
  open: boolean;
  title?: string;
  subtitle?: string;
  size: ModalSize;

  closeOnBackdrop: boolean;
  closeOnEsc: boolean;
  loading: boolean;

  panelClass: string;
};

const meta: Meta<ModalArgs> = {
  title: 'Gravitas/Modal',
  component: Modal,
  args: {
    open: true,
    title: 'Edit Claim',
    subtitle: 'Update patient + billing details',
    size: 'md',
    closeOnBackdrop: true,
    closeOnEsc: true,
    loading: false,
    panelClass: '',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    open: { control: 'boolean' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    loading: { control: 'boolean' },
    panelClass: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<ModalArgs>;

function renderModal(args: ModalArgs) {
  return {
    props: {
      ...args,
      onOpenChange: (v: boolean) => {
        // keep Storybook controls/state in sync
        args.open = v;
        return v;
      },
      onClosed: (_reason: 'backdrop' | 'esc' | 'button') => void 0,
    },
    moduleMetadata: {
      imports: [Modal, Button],
    },
    template: `
      <div style="height: 100vh; padding: 16px;">
        <gv-button className="btn-primary" (click)="onOpenChange(true)">Open modal</gv-button>

        <gv-modal
          [open]="open"
          [title]="title"
          [subtitle]="subtitle"
          [size]="size"
          [closeOnBackdrop]="closeOnBackdrop"
          [closeOnEsc]="closeOnEsc"
          [loading]="loading"
          [panelClass]="panelClass"
          (openChange)="onOpenChange($event)"
          (closed)="onClosed($event)"
        >
          <div class="d-flex flex-column gap-2">
            <div class="fw-semibold">Patient</div>
            <div class="text-muted">This is where your form fields will go.</div>
            <div class="p-2 rounded border bg-white">
              <div class="text-muted">Example content block</div>
            </div>
          </div>

          <div gvFooter>
            <gv-button variant="light" (click)="onOpenChange(false)">Cancel</gv-button>
            <gv-button variant="primary" [loading]="loading">Save</gv-button>
          </div>
        </gv-modal>
      </div>
    `,
  };
}

export const Default: Story = {
  render: renderModal,
};

export const Loading: Story = {
  args: { loading: true },
  render: renderModal,
};

export const Large: Story = {
  args: { size: 'lg' },
  render: renderModal,
};
