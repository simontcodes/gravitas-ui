import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Gravitas/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    fullWidth: false,
    loadingText: '',
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
    loadingText: { control: 'text' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Button>;

function renderButton(args: Button) {
  return {
    props: args,
    template: `
      <gv-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [loading]="loading"
        [fullWidth]="fullWidth"
        [loadingText]="loadingText"
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

export const LoadingWithText: Story = {
  args: { loading: true, loadingText: 'Saving...' },
  render: renderButton,
};

export const Disabled: Story = {
  args: { disabled: true },
  render: renderButton,
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => ({
    ...renderButton(args),
    template: `
      <div style="max-width: 480px;">
        <gv-button
          [variant]="variant"
          [size]="size"
          [disabled]="disabled"
          [loading]="loading"
          [fullWidth]="fullWidth"
          [loadingText]="loadingText"
          [className]="className"
        >
          Button
        </gv-button>
      </div>
    `,
  }),
};

export const LeftIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
      <gv-button
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
};

export const RightIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
      <gv-button
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
};

export const LeftAndRightIcons: Story = {
  render: (args) => ({
    props: args,
    template: `
      <gv-button
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
};
