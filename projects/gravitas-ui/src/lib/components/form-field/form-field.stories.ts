import type { Meta, StoryObj } from '@storybook/angular';
import { FormField } from './form-field';

const meta: Meta<FormField> = {
  title: 'Gravitas/Form Field',
  component: FormField,
  args: {
    label: 'Email',
    required: false,
    helperText: 'We’ll never share your email.',
    error: null,
    fullWidth: true,
    controlId: 'email',
  },
  argTypes: {
    error: { control: 'text' },
    helperText: { control: 'text' },
    label: { control: 'text' },
    required: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    controlId: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<FormField>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px;">
        <gv-form-field
          [label]="label"
          [required]="required"
          [helperText]="helperText"
          [error]="error"
          [fullWidth]="fullWidth"
          [controlId]="controlId"
        >
          <!-- demo control -->
          <input
            class="form-control"
            [id]="controlId"
            [attr.aria-describedby]="controlId + '__desc'"
            [attr.aria-invalid]="!!error"
            placeholder="name@company.com"
          />
        </gv-form-field>
      </div>
    `,
  }),
};

export const WithError: Story = {
  args: {
    error: 'Password must be at least 8 characters long.',
    helperText: 'Use at least one number and one symbol.',
    label: 'Password',
    required: true,
    controlId: 'password',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px;">
        <gv-form-field
          [label]="label"
          [required]="required"
          [helperText]="helperText"
          [error]="error"
          [fullWidth]="fullWidth"
          [controlId]="controlId"
        >
          <input
            class="form-control is-invalid"
            [id]="controlId"
            [attr.aria-describedby]="controlId + '__desc'"
            aria-invalid="true"
            placeholder="••••••••"
          />
        </gv-form-field>
      </div>
    `,
  }),
};

export const WithPrefixSuffix: Story = {
  args: {
    label: 'Amount',
    helperText: 'Enter a number only.',
    controlId: 'amount',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 420px;">
        <gv-form-field
          [label]="label"
          [helperText]="helperText"
          [error]="error"
          [fullWidth]="fullWidth"
          [controlId]="controlId"
        >
          <span prefix class="fw-semibold">$</span>

          <input
            class="form-control"
            [id]="controlId"
            [attr.aria-describedby]="controlId + '__desc'"
            placeholder="0.00"
          />

          <span suffix class="text-uppercase small">CAD</span>
        </gv-form-field>
      </div>
    `,
  }),
};
