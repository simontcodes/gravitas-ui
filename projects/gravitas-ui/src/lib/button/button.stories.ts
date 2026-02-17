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
  render: (args) => ({
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
  }),
};

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const FullWidth: Story = { args: { className: 'w-100' } };
