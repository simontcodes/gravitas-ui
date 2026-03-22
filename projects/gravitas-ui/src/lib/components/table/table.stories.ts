import type { Meta, StoryObj } from '@storybook/angular';
import { Table, GvTableColumn, GvTablePageSizeOption } from './table';

type PolicyRow = {
  name: string;
  email: string;
  status: string;
  premium: number;
  renewalDate: string;
};

const columns: GvTableColumn<PolicyRow>[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    searchable: true,
    filter: { type: 'text' },
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    searchable: true,
    filter: { type: 'text' },
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    filter: {
      type: 'select',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Expired', value: 'Expired' },
        { label: 'Cancelled', value: 'Cancelled' },
      ],
    },
  },
  {
    key: 'premium',
    label: 'Premium',
    sortable: true,
    align: 'end',
    width: '120px',
    filter: { type: 'number-range' },
  },
  {
    key: 'renewalDate',
    label: 'Renewal Date',
    sortable: true,
    width: '140px',
    filter: { type: 'date-range' },
  },
];

const rows: PolicyRow[] = [
  {
    name: 'John Doe',
    email: 'john.doe@email.com',
    status: 'Active',
    premium: 1200,
    renewalDate: '2026-04-12',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    status: 'Pending',
    premium: 850,
    renewalDate: '2026-05-01',
  },
  {
    name: 'Michael Ross',
    email: 'michael.ross@email.com',
    status: 'Expired',
    premium: 430,
    renewalDate: '2026-03-18',
  },
  {
    name: 'Rachel Zane',
    email: 'rachel.zane@email.com',
    status: 'Active',
    premium: 980,
    renewalDate: '2026-06-08',
  },
  {
    name: 'Harvey Specter',
    email: 'harvey.specter@email.com',
    status: 'Pending',
    premium: 2100,
    renewalDate: '2026-07-22',
  },
  {
    name: 'Louis Litt',
    email: 'louis.litt@email.com',
    status: 'Active',
    premium: 1575,
    renewalDate: '2026-04-30',
  },
  {
    name: 'Donna Paulsen',
    email: 'donna.paulsen@email.com',
    status: 'Cancelled',
    premium: 620,
    renewalDate: '2026-08-14',
  },
  {
    name: 'Jessica Pearson',
    email: 'jessica.pearson@email.com',
    status: 'Active',
    premium: 3000,
    renewalDate: '2026-09-11',
  },
  {
    name: 'Mike Wheeler',
    email: 'mike.wheeler@email.com',
    status: 'Pending',
    premium: 710,
    renewalDate: '2026-05-20',
  },
  {
    name: 'Eleven Hopper',
    email: 'eleven.hopper@email.com',
    status: 'Active',
    premium: 1400,
    renewalDate: '2026-10-02',
  },
  {
    name: 'Will Byers',
    email: 'will.byers@email.com',
    status: 'Expired',
    premium: 390,
    renewalDate: '2026-03-09',
  },
  {
    name: 'Lucas Sinclair',
    email: 'lucas.sinclair@email.com',
    status: 'Active',
    premium: 1110,
    renewalDate: '2026-11-15',
  },
];

const pageSizeOptions: GvTablePageSizeOption[] = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '25', value: 25 },
];

const meta: Meta<Table<PolicyRow>> = {
  title: 'Gravitas/Table',
  component: Table,
  args: {
    columns,
    rows,
    filterable: false,
    showColumnFilters: false,
    filterPlaceholder: 'Search records...',
    pagination: true,
    pageSize: 5,
    pageSizeOptions,
    rowLimit: null,
    loading: false,
    emptyText: 'No records found.',
    className: '',
    striped: false,
    hover: true,
    compact: false,
  },
  argTypes: {
    columns: { control: false },
    rows: { control: false },
    pageSizeOptions: { control: false },
    className: { control: 'text' },
    pageSize: { control: 'number' },
    rowLimit: { control: 'number' },
    filterable: { control: 'boolean' },
    showColumnFilters: { control: 'boolean' },
    pagination: { control: 'boolean' },
    loading: { control: 'boolean' },
    striped: { control: 'boolean' },
    hover: { control: 'boolean' },
    compact: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Table<PolicyRow>>;

function renderTable(args: any) {
  return {
    props: args,
    template: `
      <div style="padding: 16px; background: #f8fafc; min-height: 100vh;">
        <div style="max-width: 1100px;">
          <gv-table
            [columns]="columns"
            [rows]="rows"
            [filterable]="filterable"
            [showColumnFilters]="showColumnFilters"
            [filterPlaceholder]="filterPlaceholder"
            [pagination]="pagination"
            [pageSize]="pageSize"
            [pageSizeOptions]="pageSizeOptions"
            [rowLimit]="rowLimit"
            [loading]="loading"
            [emptyText]="emptyText"
            [className]="className"
            [striped]="striped"
            [hover]="hover"
            [compact]="compact"
          ></gv-table>
        </div>
      </div>
    `,
  };
}

export const Default: Story = {
  args: {
    filterable: false,
    showColumnFilters: false,
  },
  render: renderTable,
};

export const GlobalSearch: Story = {
  args: {
    filterable: true,
    showColumnFilters: false,
  },
  render: renderTable,
};

export const ColumnFilters: Story = {
  args: {
    filterable: false,
    showColumnFilters: true,
  },
  render: renderTable,
};

export const SearchAndColumnFilters: Story = {
  args: {
    filterable: true,
    showColumnFilters: true,
  },
  render: renderTable,
};

export const Striped: Story = {
  args: {
    striped: true,
    showColumnFilters: false,
  },
  render: renderTable,
};

export const Compact: Story = {
  args: {
    compact: true,
    showColumnFilters: false,
  },
  render: renderTable,
};

export const WithPagination: Story = {
  args: {
    pagination: true,
    pageSize: 5,
    showColumnFilters: false,
  },
  render: renderTable,
};

export const WithRowLimit: Story = {
  args: {
    pagination: false,
    rowLimit: 6,
    filterable: true,
    showColumnFilters: false,
  },
  render: renderTable,
};

export const Loading: Story = {
  args: {
    loading: true,
    showColumnFilters: false,
  },
  render: renderTable,
};

export const Empty: Story = {
  args: {
    rows: [],
    emptyText: 'There are no policies to display yet.',
    showColumnFilters: false,
  },
  render: renderTable,
};

export const FullFeatured: Story = {
  args: {
    filterable: true,
    showColumnFilters: true,
    pagination: true,
    pageSize: 5,
    striped: true,
    hover: true,
  },
  render: renderTable,
};
