import type { Meta, StoryObj } from '@storybook/angular';
import { Dropdown, DropdownMenuDirective, DropdownTriggerDirective } from './dropdown';

const meta: Meta<Dropdown> = {
  title: 'Gravitas/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    align: 'start',
    disabled: false,
    closeOnItemClick: true,
  },
  argTypes: {
    align: {
      control: 'inline-radio',
      options: ['start', 'end'],
    },
    disabled: {
      control: 'boolean',
    },
    closeOnItemClick: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<Dropdown>;

const dropdownImports = [Dropdown, DropdownTriggerDirective, DropdownMenuDirective];

export const Basic: Story = {
  render: (args) => ({
    props: args,
    imports: dropdownImports,
    template: `
      <div class="p-4">
        <gv-dropdown
          [align]="align"
          [disabled]="disabled"
          [closeOnItemClick]="closeOnItemClick"
        >
          <button gvDropdownTrigger type="button" class="btn btn-outline-secondary">
            Actions
          </button>

          <div gvDropdownMenu>
            <button type="button">View details</button>
            <button type="button">Edit record</button>
            <button type="button">Duplicate</button>
            <hr class="gv-dropdown-divider" />
            <button type="button" class="gv-dropdown-item gv-dropdown-item--danger">
              Delete
            </button>
          </div>
        </gv-dropdown>
      </div>
    `,
  }),
};

export const AlignEnd: Story = {
  render: () => ({
    imports: dropdownImports,
    template: `
      <div
        class="p-4"
        style="display: flex; justify-content: flex-end; width: 100%;"
      >
        <gv-dropdown align="end">
          <button gvDropdownTrigger type="button" class="btn btn-outline-secondary">
            Profile
          </button>

          <div gvDropdownMenu>
            <button type="button">Account settings</button>
            <button type="button">Billing</button>
            <button type="button">Team members</button>
            <hr class="gv-dropdown-divider" />
            <button type="button" class="gv-dropdown-item gv-dropdown-item--danger">
              Log out
            </button>
          </div>
        </gv-dropdown>
      </div>
    `,
  }),
};

export const RowActions: Story = {
  render: () => ({
    imports: dropdownImports,
    template: `
      <div
        class="p-4"
        style="
          width: 420px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          "
        >
          <div>
            <div style="font-weight: 600; color: #0f172a;">Acme Logistics</div>
            <div style="font-size: 14px; color: #64748b;">Broker account</div>
          </div>

          <gv-dropdown align="end">
            <button gvDropdownTrigger type="button" class="btn btn-outline-secondary">
              ⋯
            </button>

            <div gvDropdownMenu>
              <button type="button">Open account</button>
              <button type="button">Edit</button>
              <button type="button">Archive</button>
              <hr class="gv-dropdown-divider" />
              <button type="button" class="gv-dropdown-item gv-dropdown-item--danger">
                Delete
              </button>
            </div>
          </gv-dropdown>
        </div>
      </div>
    `,
  }),
};

export const RichMenu: Story = {
  render: () => ({
    imports: dropdownImports,
    template: `
      <div class="p-4">
        <gv-dropdown>
          <button gvDropdownTrigger type="button" class="btn btn-outline-secondary">
            Quick actions
          </button>

          <div gvDropdownMenu>
            <button type="button" class="gv-dropdown-item">
              Export report
              <span class="gv-dropdown-item__meta">⌘E</span>
            </button>

            <button type="button" class="gv-dropdown-item">
              Refresh data
              <span class="gv-dropdown-item__meta">R</span>
            </button>

            <button type="button" class="gv-dropdown-item gv-dropdown-item--muted">
              View activity log
            </button>
          </div>
        </gv-dropdown>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    imports: dropdownImports,
    template: `
      <div class="p-4">
        <gv-dropdown [disabled]="true">
          <button gvDropdownTrigger type="button" class="btn btn-outline-secondary" disabled>
            Disabled
          </button>

          <div gvDropdownMenu>
            <button type="button">Should not open</button>
          </div>
        </gv-dropdown>
      </div>
    `,
  }),
};
