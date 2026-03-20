import type { Meta, StoryObj } from '@storybook/angular';
import { Loader } from './loader';

const meta: Meta<Loader> = {
  title: 'GRAVITAS/Loader',
  component: Loader,
  tags: ['autodocs'],
  args: {
    variant: 'spinner',
    size: 'md',
    label: '',
    inline: false,
    overlay: false,
    centered: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['spinner', 'dots'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    label: {
      control: 'text',
    },
    inline: {
      control: 'boolean',
    },
    overlay: {
      control: 'boolean',
    },
    centered: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<Loader>;

export const Default: Story = {
  args: {
    variant: 'spinner',
    size: 'md',
    label: 'Loading...',
  },
};

export const WithLabel: Story = {
  args: {
    variant: 'spinner',
    size: 'md',
    label: 'Loading data...',
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
    size: 'md',
    label: 'Syncing...',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div class="d-flex align-items-center gap-4 flex-wrap p-3">
        <gv-loader size="sm" label="Small"></gv-loader>
        <gv-loader size="md" label="Medium"></gv-loader>
        <gv-loader size="lg" label="Large"></gv-loader>
      </div>
    `,
  }),
};

export const Inline: Story = {
  render: () => ({
    template: `
      <div class="p-3" style="font-size: 14px; color: #475569;">
        Saving changes
        <gv-loader
          class="ms-2"
          [inline]="true"
          variant="dots"
          size="sm"
          label="Please wait"
        ></gv-loader>
      </div>
    `,
  }),
};

export const CenteredInCard: Story = {
  render: () => ({
    template: `
      <div
        class="p-4"
        style="
          width: 360px;
          min-height: 180px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          display: flex;
          align-items: center;
        "
      >
        <gv-loader
          [centered]="true"
          size="lg"
          label="Loading dashboard widget..."
        ></gv-loader>
      </div>
    `,
  }),
};

export const Overlay: Story = {
  render: () => ({
    template: `
      <div
        class="position-relative p-4"
        style="
          width: 420px;
          min-height: 240px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          overflow: hidden;
        "
      >
        <div style="color: #64748b;">
          <div style="font-weight: 600; color: #0f172a; margin-bottom: 12px;">
            Revenue Overview
          </div>

          <div
            style="
              height: 120px;
              border-radius: 10px;
              background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
              border: 1px solid #e2e8f0;
            "
          ></div>

          <div
            style="
              display: flex;
              gap: 12px;
              margin-top: 16px;
            "
          >
            <div
              style="
                height: 12px;
                width: 90px;
                border-radius: 999px;
                background: #e2e8f0;
              "
            ></div>
            <div
              style="
                height: 12px;
                width: 120px;
                border-radius: 999px;
                background: #e2e8f0;
              "
            ></div>
          </div>
        </div>

        <gv-loader
          [overlay]="true"
          size="md"
          label="Refreshing..."
        ></gv-loader>
      </div>
    `,
  }),
};
