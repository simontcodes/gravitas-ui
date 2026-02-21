import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
} from '@angular/core';

import { Tab } from './tab';
import { TabPanel } from './tab-panel';

export type TabsVariant = 'underline' | 'pill';

@Component({
  selector: 'gv-tabs',
  standalone: true,
  styleUrls: ['./tabs.css'],
  template: `
    <ng-content select="gv-tab-list"></ng-content>
    <ng-content select="gv-tab-panels"></ng-content>
  `,
})
export class Tabs implements AfterContentInit {
  @Input() value: string | null = null;
  @Output() valueChange = new EventEmitter<string>();

  @Input() variant: TabsVariant = 'underline';

  @HostBinding('attr.data-gv-tabs-variant')
  get dataVariant() {
    return this.variant;
  }

  @ContentChildren(Tab) tabs!: QueryList<Tab>;
  @ContentChildren(TabPanel) panels!: QueryList<TabPanel>;

  ngAfterContentInit(): void {
    // If no value, pick first enabled tab.
    queueMicrotask(() => {
      if (!this.value) {
        const firstEnabled = this.tabs?.find((t) => !t.disabled);
        if (firstEnabled) this.setValue(firstEnabled.value, false);
      }

      this.syncChildren();
      this.tabs.changes.subscribe(() => this.syncChildren());
      this.panels.changes.subscribe(() => this.syncChildren());
    });
  }

  setValue(next: string, emit = true) {
    if (this.value === next) return;
    this.value = next;
    if (emit) this.valueChange.emit(next);
    this.syncChildren();
  }

  private syncChildren() {
    const active = this.value;

    this.tabs?.forEach((t) => (t.active = t.value === active));
    this.panels?.forEach((p) => (p.active = p.value === active));
  }
}
