import type { Meta, StoryObj } from '@storybook/angular';
import { Empty } from './empty';

const meta: Meta<Empty> = {
  title: 'Gravitas/Empty',
  component: Empty,
  tags: ['autodocs'],
  args: {
    title: 'Nothing to show',
    description: 'There is currently no data available for this view.',
    compact: false,
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    compact: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<Empty>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    imports: [Empty],
    template: `
      <gv-empty
        [title]="title"
        [description]="description"
        [compact]="compact"
      ></gv-empty>
    `,
  }),
};

export const WithAction: Story = {
  render: () => ({
    imports: [Empty],
    template: `
      <gv-empty
        title="No records found"
        description="Try adjusting your filters or create a new record."
      >
        <button
          gvEmptyActions
          type="button"
          class="btn btn-primary"
        >
          Create record
        </button>
      </gv-empty>
    `,
  }),
};

export const Compact: Story = {
  render: () => ({
    imports: [Empty],
    template: `
      <div
        style="
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
        "
      >
        <gv-empty
          compact
          title="No results"
          description="No matching records were found."
        ></gv-empty>
      </div>
    `,
  }),
};

export const InTable: Story = {
  render: () => ({
    imports: [Empty],
    template: `
      <div
        style="
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        "
      >
        <gv-empty
          title="No data available"
          description="This table has no rows yet."
        ></gv-empty>
      </div>
    `,
  }),
};

export const FirstTimeExperience: Story = {
  render: () => ({
    imports: [Empty],
    template: `
      <div
        style="
          padding: 24px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #ffffff;
          max-width: 480px;
        "
      >
        <gv-empty
          title="Get started"
          description="Create your first record to begin using this feature."
        >
          <button
            gvEmptyActions
            class="btn btn-primary"
            type="button"
          >
            Create your first item
          </button>
        </gv-empty>
      </div>
    `,
  }),
};
