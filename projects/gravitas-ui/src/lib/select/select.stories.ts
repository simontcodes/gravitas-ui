import type { Meta, StoryObj } from '@storybook/angular';
import { Select, GvSelectOption } from './select';
import { FormsModule } from '@angular/forms';

const options: GvSelectOption<string>[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Denied', value: 'denied' },
];

const meta: Meta<Select<string>> = {
  title: 'Gravitas/Select',
  component: Select,
  decorators: [
    (story) => ({
      ...story(),
      moduleMetadata: {
        imports: [FormsModule],
      },
    }),
  ],
  args: {
    label: 'Status',
    placeholder: 'Select a status',
    helperText: 'Used to route billing workflow',
    options,
    required: false,
    size: 'md',
    fullWidth: false,
    loading: false,
    loadingText: 'Loading...',
    error: null,
    className: '',
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<Select<string>>;

function renderSelect(args: any) {
  return {
    props: args,
    template: `
      <div style="max-width: 420px;">
        <gv-select
          [label]="label"
          [placeholder]="placeholder"
          [helperText]="helperText"
          [error]="error"
          [required]="required"
          [options]="options"
          [size]="size"
          [fullWidth]="fullWidth"
          [loading]="loading"
          [loadingText]="loadingText"
          [className]="className"
        ></gv-select>
      </div>
    `,
  };
}

export const Default: Story = { render: renderSelect };

export const ErrorState: Story = {
  args: { error: 'Status is required.' },
  render: renderSelect,
};

export const Loading: Story = {
  args: { loading: true },
  render: renderSelect,
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: renderSelect,
};
