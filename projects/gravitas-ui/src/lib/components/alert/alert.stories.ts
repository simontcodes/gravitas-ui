import type { Meta, StoryObj } from '@storybook/angular';
import { Alert } from './alert';

const meta: Meta<Alert> = {
  title: 'Gravitas/Alert',
  component: Alert,
  tags: ['autodocs'],
  args: {
    variant: 'info',
    title: 'Heads up',
    dismissible: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['neutral', 'info', 'success', 'warning', 'danger'],
    },
    title: {
      control: 'text',
    },
    dismissible: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<Alert>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    imports: [Alert],
    template: `
      <gv-alert
        [variant]="variant"
        [title]="title"
        [dismissible]="dismissible"
      >
        This is an inline alert message for the current section.
      </gv-alert>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    imports: [Alert],
    template: `
      <div
        style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 720px;"
      >
        <gv-alert variant="neutral" title="Note">
          This record is visible to all team members with access.
        </gv-alert>

        <gv-alert variant="info" title="Info">
          New policy changes will be reflected after the next sync cycle.
        </gv-alert>

        <gv-alert variant="success" title="Saved successfully">
          Your commission settings were updated.
        </gv-alert>

        <gv-alert variant="warning" title="Action recommended">
          Some required fields are still incomplete.
        </gv-alert>

        <gv-alert variant="danger" title="Something went wrong">
          We could not save your changes. Please try again.
        </gv-alert>
      </div>
    `,
  }),
};

export const Dismissible: Story = {
  render: () => ({
    imports: [Alert],
    template: `
      <div style="max-width: 720px;">
        <gv-alert variant="info" title="Dismissible alert" dismissible>
          You can close this message after reviewing it.
        </gv-alert>
      </div>
    `,
  }),
};

export const WithoutTitle: Story = {
  render: () => ({
    imports: [Alert],
    template: `
      <div style="max-width: 720px;">
        <gv-alert variant="neutral">
          This is a simpler alert without a title.
        </gv-alert>
      </div>
    `,
  }),
};

export const InCardExample: Story = {
  render: () => ({
    imports: [Alert],
    template: `
      <div
        style="
          width: 420px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
        "
      >
        <div
          style="
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 14px;
          "
        >
          Billing settings
        </div>

        <gv-alert variant="warning" title="Payment method expiring soon">
          Update your billing details to avoid interruptions in service.
        </gv-alert>
      </div>
    `,
  }),
};

export const AboveTableExample: Story = {
  render: () => ({
    imports: [Alert],
    template: `
      <div style="max-width: 760px;">
        <gv-alert variant="info" title="Filtered results">
          Showing 18 matching records based on the current filters.
        </gv-alert>

        <div
          style="
            margin-top: 12px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            background: #ffffff;
            min-height: 140px;
          "
        ></div>
      </div>
    `,
  }),
};
