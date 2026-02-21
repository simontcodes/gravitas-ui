import type { Meta, StoryObj } from '@storybook/angular';
import { Tabs } from './tabs';
import { TabList } from './tab-list';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';
import { TabPanels } from './tab-panels';

const meta: Meta<Tabs> = {
  title: 'Gravitas/Tabs',
  component: Tabs,
  args: { value: 'overview', variant: 'underline' },
  argTypes: {
    variant: { control: 'select', options: ['underline', 'pill'] },
  },
};

export default meta;
type Story = StoryObj<Tabs>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    moduleMetadata: { imports: [Tabs, TabList, Tab, TabPanels, TabPanel] },
    template: `
      <gv-tabs [(value)]="value" [variant]="variant">
        <gv-tab-list>
          <gv-tab value="overview">Overview</gv-tab>
          <gv-tab value="billing">Billing</gv-tab>
          <gv-tab value="audit" [disabled]="true">Audit</gv-tab>
          <gv-tab value="settings">Settings</gv-tab>
        </gv-tab-list>

        <gv-tab-panels>
          <gv-tab-panel value="overview">Overview content</gv-tab-panel>
          <gv-tab-panel value="billing">Billing content</gv-tab-panel>
          <gv-tab-panel value="audit">Audit content</gv-tab-panel>
          <gv-tab-panel value="settings">Settings content</gv-tab-panel>
        </gv-tab-panels>
      </gv-tabs>
    `,
  }),
};
