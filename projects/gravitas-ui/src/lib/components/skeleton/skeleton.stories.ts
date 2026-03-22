import type { Meta, StoryObj } from '@storybook/angular';
import { Skeleton } from './skeleton';

const meta: Meta<Skeleton> = {
  title: 'Gravitas/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: {
    variant: 'rect',
    width: '',
    height: '',
    lines: 1,
    animated: true,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['text', 'rect', 'circle'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    lines: {
      control: {
        type: 'number',
        min: 1,
        step: 1,
      },
    },
    animated: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    lines: 3,
    width: '100%',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 320px; padding: 12px;">
        <gv-skeleton
          [variant]="variant"
          [lines]="lines"
          [width]="width || undefined"
          [height]="height || undefined"
          [animated]="animated"
        ></gv-skeleton>
      </div>
    `,
  }),
};

export const Rectangle: Story = {
  args: {
    variant: 'rect',
    width: '320px',
    height: '120px',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '56px',
    height: '56px',
  },
};

export const Static: Story = {
  args: {
    variant: 'text',
    lines: 3,
    width: '100%',
    animated: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 320px; padding: 12px;">
        <gv-skeleton
          [variant]="variant"
          [lines]="lines"
          [width]="width || undefined"
          [animated]="animated"
        ></gv-skeleton>
      </div>
    `,
  }),
};

export const CardExample: Story = {
  render: () => ({
    template: `
      <div
        style="
          width: 360px;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
        "
      >
        <gv-skeleton variant="text" width="42%" height="16px"></gv-skeleton>

        <div style="margin-top: 10px;">
          <gv-skeleton variant="text" width="24%" height="12px"></gv-skeleton>
        </div>

        <div style="margin-top: 18px;">
          <gv-skeleton variant="rect" height="132px"></gv-skeleton>
        </div>

        <div style="display: flex; gap: 12px; margin-top: 18px;">
          <gv-skeleton variant="rect" width="84px" height="12px"></gv-skeleton>
          <gv-skeleton variant="rect" width="112px" height="12px"></gv-skeleton>
        </div>
      </div>
    `,
  }),
};

export const TableRowsExample: Story = {
  render: () => ({
    template: `
      <div
        style="
          width: 640px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          overflow: hidden;
        "
      >
        <div
          style="
            display: grid;
            grid-template-columns: 1.2fr 1fr 1fr 0.8fr;
            gap: 16px;
            padding: 14px 16px;
            border-bottom: 1px solid #e2e8f0;
            background: #f8fafc;
          "
        >
          <gv-skeleton variant="text" width="70%" height="12px"></gv-skeleton>
          <gv-skeleton variant="text" width="60%" height="12px"></gv-skeleton>
          <gv-skeleton variant="text" width="60%" height="12px"></gv-skeleton>
          <gv-skeleton variant="text" width="50%" height="12px"></gv-skeleton>
        </div>

        <div
          style="
            display: flex;
            flex-direction: column;
          "
        >
          <div
            style="
              display: grid;
              grid-template-columns: 1.2fr 1fr 1fr 0.8fr;
              gap: 16px;
              padding: 16px;
              border-bottom: 1px solid #f1f5f9;
            "
          >
            <gv-skeleton variant="text" lines="2"></gv-skeleton>
            <gv-skeleton variant="text" width="80%"></gv-skeleton>
            <gv-skeleton variant="text" width="75%"></gv-skeleton>
            <gv-skeleton variant="rect" width="72px" height="24px"></gv-skeleton>
          </div>

          <div
            style="
              display: grid;
              grid-template-columns: 1.2fr 1fr 1fr 0.8fr;
              gap: 16px;
              padding: 16px;
              border-bottom: 1px solid #f1f5f9;
            "
          >
            <gv-skeleton variant="text" lines="2"></gv-skeleton>
            <gv-skeleton variant="text" width="72%"></gv-skeleton>
            <gv-skeleton variant="text" width="68%"></gv-skeleton>
            <gv-skeleton variant="rect" width="64px" height="24px"></gv-skeleton>
          </div>

          <div
            style="
              display: grid;
              grid-template-columns: 1.2fr 1fr 1fr 0.8fr;
              gap: 16px;
              padding: 16px;
            "
          >
            <gv-skeleton variant="text" lines="2"></gv-skeleton>
            <gv-skeleton variant="text" width="76%"></gv-skeleton>
            <gv-skeleton variant="text" width="70%"></gv-skeleton>
            <gv-skeleton variant="rect" width="80px" height="24px"></gv-skeleton>
          </div>
        </div>
      </div>
    `,
  }),
};

export const FormExample: Story = {
  render: () => ({
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
        <div style="margin-bottom: 18px;">
          <gv-skeleton variant="text" width="28%" height="12px"></gv-skeleton>
          <div style="margin-top: 8px;">
            <gv-skeleton variant="rect" height="40px"></gv-skeleton>
          </div>
        </div>

        <div style="margin-bottom: 18px;">
          <gv-skeleton variant="text" width="34%" height="12px"></gv-skeleton>
          <div style="margin-top: 8px;">
            <gv-skeleton variant="rect" height="40px"></gv-skeleton>
          </div>
        </div>

        <div>
          <gv-skeleton variant="text" width="22%" height="12px"></gv-skeleton>
          <div style="margin-top: 8px;">
            <gv-skeleton variant="rect" height="96px"></gv-skeleton>
          </div>
        </div>
      </div>
    `,
  }),
};

export const ProfileRowExample: Story = {
  render: () => ({
    template: `
      <div
        style="
          width: 340px;
          padding: 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          display: flex;
          align-items: center;
          gap: 14px;
        "
      >
        <gv-skeleton variant="circle" width="44px" height="44px"></gv-skeleton>

        <div style="flex: 1;">
          <gv-skeleton variant="text" width="58%"></gv-skeleton>
          <div style="margin-top: 8px;">
            <gv-skeleton variant="text" width="38%" height="12px"></gv-skeleton>
          </div>
        </div>
      </div>
    `,
  }),
};
