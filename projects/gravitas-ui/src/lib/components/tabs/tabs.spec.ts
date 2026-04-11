import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabList } from './tab-list';
import { TabPanel } from './tab-panel';
import { TabPanels } from './tab-panels';
import { Tab } from './tab';
import { Tabs } from './tabs';

@Component({
  standalone: true,
  imports: [Tabs, TabList, Tab, TabPanels, TabPanel],
  template: `
    <gv-tabs [(value)]="value">
      <gv-tab-list>
        <gv-tab value="overview">Overview</gv-tab>
        <gv-tab value="billing">Billing</gv-tab>
        <gv-tab value="audit" [disabled]="true">Audit</gv-tab>
      </gv-tab-list>

      <gv-tab-panels>
        <gv-tab-panel value="overview">Overview content</gv-tab-panel>
        <gv-tab-panel value="billing">Billing content</gv-tab-panel>
        <gv-tab-panel value="audit">Audit content</gv-tab-panel>
      </gv-tab-panels>
    </gv-tabs>
  `,
})
class TabsTestHost {
  value: string | null = 'overview';
}

describe('Tabs', () => {
  let fixture: ComponentFixture<TabsTestHost>;
  let host: TabsTestHost;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabsTestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsTestHost);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders the bound tab as active', () => {
    const buttons = getTabButtons();

    expect(host.value).toBe('overview');
    expect(buttons[0].getAttribute('aria-selected')).toBe('true');
    expect(buttons[1].getAttribute('aria-selected')).toBe('false');
  });

  it('switches the active tab when another tab is clicked', async () => {
    const buttons = getTabButtons();

    buttons[1].click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.value).toBe('billing');
    expect(buttons[0].getAttribute('aria-selected')).toBe('false');
    expect(buttons[1].getAttribute('aria-selected')).toBe('true');

    const panels = Array.from(
      fixture.nativeElement.querySelectorAll('.gv-tab-panel')
    ) as HTMLElement[];

    expect(panels[0].hidden).toBe(true);
    expect(panels[1].hidden).toBe(false);
  });

  function getTabButtons(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('.gv-tab')
    ) as HTMLButtonElement[];
  }
});
