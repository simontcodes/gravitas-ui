import type { Meta, StoryObj } from '@storybook/angular';
import { Badge } from './badge';

const meta: Meta<Badge> = {
  title: 'Gravitas/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    variant: 'neutral',
    size: 'md',
    pill: false,
    dot: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['neutral', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
    },
    pill: {
      control: 'boolean',
    },
    dot: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<Badge>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    imports: [Badge],
    template: `
      <gv-badge
        [variant]="variant"
        [size]="size"
        [pill]="pill"
        [dot]="dot"
      >
        Badge
      </gv-badge>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    imports: [Badge],
    template: `
      <div
        style="
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        "
        class="d-flex gap-2 flex-wrap"
      >
        <gv-badge variant="neutral">Neutral</gv-badge>
        <gv-badge variant="primary">Primary</gv-badge>
        <gv-badge variant="success">Success</gv-badge>
        <gv-badge variant="warning">Warning</gv-badge>
        <gv-badge variant="danger">Danger</gv-badge>
        <gv-badge variant="info">Info</gv-badge>
      </div>
    `,
  }),
};

export const WithDots: Story = {
  render: () => ({
    imports: [Badge],
    template: `
      <div
        style="
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        "
        class="d-flex gap-2 flex-wrap"
      >
        <gv-badge dot variant="neutral">Draft</gv-badge>
        <gv-badge dot variant="primary">In Review</gv-badge>
        <gv-badge dot variant="success">Active</gv-badge>
        <gv-badge dot variant="warning">Pending</gv-badge>
        <gv-badge dot variant="danger">Blocked</gv-badge>
        <gv-badge dot variant="info">Synced</gv-badge>
      </div>
    `,
  }),
};

export const Pill: Story = {
  render: () => ({
    imports: [Badge],
    template: `
      <div
        style="
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        "
        class="d-flex gap-2 flex-wrap"
      >
        <gv-badge pill variant="primary">Primary</gv-badge>
        <gv-badge pill variant="success">Active</gv-badge>
        <gv-badge pill variant="danger">Blocked</gv-badge>
      </div>
    `,
  }),
};

export const PillWithDots: Story = {
  render: () => ({
    imports: [Badge],
    template: `
      <div
        style="
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        "
        class="d-flex gap-2 flex-wrap"
      >
        <gv-badge pill dot variant="success">Live</gv-badge>
        <gv-badge pill dot variant="warning">Pending</gv-badge>
        <gv-badge pill dot variant="danger">Overdue</gv-badge>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    imports: [Badge],
    template: `
      <div
        style="
          padding: 20px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
        "
        class="d-flex gap-2 align-items-center"
      >
        <gv-badge size="sm" dot variant="success">Small</gv-badge>
        <gv-badge size="md" dot variant="success">Medium</gv-badge>
      </div>
    `,
  }),
};

export const InTableExample: Story = {
  render: () => ({
    imports: [Badge],
    template: `
      <div
        style="
          padding: 16px;
          background: #fff;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          width: 320px;
        "
      >
        <div class="d-flex justify-content-between align-items-center">
          <span>Policy Status</span>
          <gv-badge variant="success" dot pill>Active</gv-badge>
        </div>
      </div>
    `,
  }),
};
