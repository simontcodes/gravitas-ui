import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';

import { Tabs } from './tabs';
import { TabList } from './tab-list';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';
import { TabPanels } from './tab-panels';

@Component({
  standalone: true,
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel],
  template: `
    <gv-tabs [(value)]="value" [variant]="variant">
      <gv-tab-list>
        <gv-tab value="overview">
          <span class="gv-tab__label">
            <span class="gv-tab__icon">🏠</span>
            Overview
            <span class="gv-tab__badge">3</span>
          </span>
        </gv-tab>

        <gv-tab value="billing">
          <span class="gv-tab__label">
            <span class="gv-tab__icon">💳</span>
            Billing
          </span>
        </gv-tab>

        <gv-tab value="audit" [disabled]="true">
          <span class="gv-tab__label">
            <span class="gv-tab__icon">🧾</span>
            Audit
          </span>
        </gv-tab>

        <gv-tab value="settings">
          <span class="gv-tab__label">
            <span class="gv-tab__icon">⚙️</span>
            Settings
            <span class="gv-tab__badge">12</span>
          </span>
        </gv-tab>
      </gv-tab-list>

      <gv-tab-panels>
        <gv-tab-panel value="overview">Overview content</gv-tab-panel>
        <gv-tab-panel value="billing">Billing content</gv-tab-panel>
        <gv-tab-panel value="audit">Audit content</gv-tab-panel>
        <gv-tab-panel value="settings">Settings content</gv-tab-panel>
      </gv-tab-panels>
    </gv-tabs>

    <div style="margin-top: 12px; font-size: 12px; opacity: 0.8;">
      Active tab (debug): <strong>{{ value }}</strong>
    </div>
  `,
})
class TabsStoryHost {
  value = 'overview';
  variant: 'underline' | 'pill' = 'underline';
}

const meta: Meta<TabsStoryHost> = {
  title: 'Gravitas/Tabs',
  component: TabsStoryHost,
  argTypes: {
    variant: { control: 'select', options: ['underline', 'pill'] },
  },
  args: {
    variant: 'underline',
  },
};

export default meta;

type Story = StoryObj<TabsStoryHost>;

export const Default: Story = {
  args: { variant: 'underline' },
};
