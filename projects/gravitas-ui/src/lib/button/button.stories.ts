import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Gravitas/Button',
  component: Button,
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    className: '',
  },
  argTypes: {
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
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<Button>;

// ✅ Helper: each story creates a fresh render (forces update)
function renderButton(args: Button) {
  return {
    props: args,
    template: `
      <gv-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [className]="className"
      >
        Button
      </gv-button>
    `,
  };
}

export const Primary: Story = {
  render: renderButton,
};

export const Loading: Story = {
  args: { loading: true },
  render: renderButton,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: renderButton,
};

export const FullWidth: Story = {
  args: { className: 'w-100' },
  render: (args) => ({
    ...renderButton(args),
    template: `
      <div style="max-width: 480px;">
        <gv-button
          [variant]="variant"
          [size]="size"
          [disabled]="disabled"
          [loading]="loading"
          [className]="className"
        >
          Button
        </gv-button>
      </div>
    `,
  }),
};
