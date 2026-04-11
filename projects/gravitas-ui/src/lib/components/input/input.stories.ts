import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { InputComponent } from './input';

const meta: Meta<InputComponent> = {
  title: 'Gravitas/Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, InputComponent],
    }),
  ],
  args: {
    label: 'Email',
    placeholder: 'you@company.com',
    hint: 'We’ll never share your email.',
    type: 'email',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    className: '',
    hasPrefix: false,
    hasSuffix: false,
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'text',
        'email',
        'password',
        'number',
        'tel',
        'url',
        'search',
        'date',
        'datetime-local',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  parameters: {
    docs: {
      description: {
        component: `
Single-line text input for standard form entry such as names, email, search, numeric values, and date-like browser inputs.

Input is ControlValueAccessor-based and works with Angular forms directly. Use prefix and suffix slots for lightweight adornments, and rely on the built-in field framing for labels and validation messaging.
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  render: (args: any) => ({
    props: {
      ...args,
      control: new FormControl('', [Validators.email]),
    },
    template: `
      <div style="max-width: 420px;">
        <gv-input
          [label]="label"
          [placeholder]="placeholder"
          [hint]="hint"
          [type]="type"
          [size]="size"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [className]="className"
          [hasPrefix]="hasPrefix"
          [hasSuffix]="hasSuffix"
          [formControl]="control"
        >
        </gv-input>
      </div>
    `,
  }),
};

export const WithPrefix: Story = {
  render: (args: any) => ({
    props: {
      ...args,
      hasPrefix: true,
      control: new FormControl(''),
    },
    template: `
      <div style="max-width: 420px;">
        <gv-input
          [label]="label"
          [placeholder]="placeholder"
          [hasPrefix]="true"
          [formControl]="control"
        >
          <span gvPrefix>@</span>
        </gv-input>
      </div>
    `,
  }),
};

export const ErrorState = {
  render: (args: any) => ({
    props: {
      ...args,
      label: 'Password',
      type: 'password',
      control: (() => {
        const c = new FormControl('', [Validators.required, Validators.minLength(8)]);
        c.markAsTouched(); // force error visible
        return c;
      })(),
    },
    template: `
      <div style="max-width: 420px;">
        <gv-input
          [label]="label"
          [type]="type"
          [formControl]="control"
        ></gv-input>
      </div>
    `,
  }),
};

export const Date: Story = {
  render: (args: any) => ({
    props: {
      ...args,
      label: 'Service Date',
      type: 'date',
      control: new FormControl(''),
    },
    template: `
      <div style="max-width: 420px;">
        <gv-input
          [label]="label"
          [type]="type"
          [formControl]="control"
        ></gv-input>
      </div>
    `,
  }),
};
