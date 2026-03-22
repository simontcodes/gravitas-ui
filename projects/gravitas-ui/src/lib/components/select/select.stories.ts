import type { Meta, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { Select, GvSelectOption } from './select';

const statusOptions: GvSelectOption<string>[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Denied', value: 'denied' },
];

const optionsWithDisabled: GvSelectOption<string>[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Denied', value: 'denied', disabled: true },
  { label: 'Archived', value: 'archived', disabled: true },
];

const tagOptions: GvSelectOption<string>[] = [
  { label: 'Angular', value: 'angular' },
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'NestJS', value: 'nestjs' },
  { label: 'Node.js', value: 'node' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'MongoDB', value: 'mongodb' },
];

const countryOptions: GvSelectOption<string>[] = [
  { label: 'Canada', value: 'canada' },
  { label: 'United States', value: 'usa' },
  { label: 'Mexico', value: 'mexico' },
  { label: 'Brazil', value: 'brazil' },
  { label: 'Argentina', value: 'argentina' },
  { label: 'Spain', value: 'spain' },
  { label: 'France', value: 'france' },
  { label: 'Germany', value: 'germany' },
  { label: 'Japan', value: 'japan' },
  { label: 'South Korea', value: 'south-korea' },
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
    options: statusOptions,
    required: false,
    size: 'md',
    fullWidth: false,
    loading: false,
    loadingText: 'Loading...',
    error: null,
    className: '',
    multiple: false,
    searchable: false,
    searchPlaceholder: 'Search...',
    noResultsText: 'No results found',
    clearable: false,
    disabled: false,
  },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    options: { control: false },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<Select<string>>;

function renderSelect(args: any, initialModel: any = null) {
  return {
    props: {
      ...args,
      model: initialModel,
    },
    template: `
      <div style="max-width: 420px;">
        <gv-select
          [(ngModel)]="model"
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
          [multiple]="multiple"
          [searchable]="searchable"
          [searchPlaceholder]="searchPlaceholder"
          [noResultsText]="noResultsText"
          [clearable]="clearable"
          [disabled]="disabled"
        ></gv-select>

        <div style="margin-top: 16px; font-size: 12px; color: #64748b;">
          <strong>ngModel:</strong> {{ model | json }}
        </div>
      </div>
    `,
  };
}

export const Default: Story = {
  render: (args) => renderSelect(args),
};

export const ErrorState: Story = {
  args: {
    error: 'Status is required.',
  },
  render: (args) => renderSelect(args),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => renderSelect(args),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => renderSelect(args),
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Status',
    placeholder: 'Select a status',
    helperText: 'Some options are intentionally unavailable',
    options: optionsWithDisabled,
  },
  render: (args) => renderSelect(args),
};

export const Preselected: Story = {
  render: (args) => renderSelect(args, 'approved'),
};

export const Multiple: Story = {
  args: {
    label: 'Technologies',
    placeholder: 'Select technologies',
    helperText: 'Choose one or more technologies',
    options: tagOptions,
    multiple: true,
    clearable: true,
  },
  render: (args) => renderSelect(args, ['angular', 'nestjs']),
};

export const Searchable: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    helperText: 'Search inside the dropdown',
    options: countryOptions,
    searchable: true,
    clearable: true,
  },
  render: (args) => renderSelect(args),
};

export const SearchableMultiple: Story = {
  args: {
    label: 'Countries',
    placeholder: 'Select countries',
    helperText: 'Search and pick multiple values',
    options: countryOptions,
    multiple: true,
    searchable: true,
    clearable: true,
  },
  render: (args) => renderSelect(args, ['canada', 'japan']),
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
  render: (args) => renderSelect(args),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: (args) => renderSelect(args),
};