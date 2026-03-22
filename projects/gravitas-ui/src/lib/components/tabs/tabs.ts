import {
  AfterContentInit,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  Output,
  QueryList,
  inject,
} from '@angular/core';
import { take } from 'rxjs/operators';

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

  private zone = inject(NgZone);
  private destroyRef = inject(DestroyRef);

  constructor(private hostEl: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    // Keep underline correct on resize
    const onResize = () => this.updateIndicatorAfterRender();
    window.addEventListener('resize', onResize, { passive: true });
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('resize', onResize);
    });

    queueMicrotask(() => {
      // If no value, pick first enabled tab.
      if (!this.value) {
        const firstEnabled = this.tabs?.find((t) => !t.disabled);
        if (firstEnabled) this.setValue(firstEnabled.value, false);
      }

      this.syncChildren();
      this.updateIndicatorAfterRender(); // ✅ initial position

      this.tabs.changes.subscribe(() => {
        this.syncChildren();
        this.updateIndicatorAfterRender();
      });

      this.panels.changes.subscribe(() => {
        this.syncChildren();
        this.updateIndicatorAfterRender();
      });
    });
  }

  setValue(next: string, emit = true) {
    if (this.value === next) return;

    this.value = next;
    if (emit) this.valueChange.emit(next);

    this.syncChildren();
    this.updateIndicatorAfterRender(); // ✅ slide underline
  }

  private syncChildren() {
    const active = this.value;

    this.tabs?.forEach((t) => (t.active = t.value === active));
    this.panels?.forEach((p) => (p.active = p.value === active));
  }

  /** Wait until Angular finishes applying DOM updates, then measure */
  private updateIndicatorAfterRender() {
    if (this.variant !== 'underline') return;

    this.zone.onStable.pipe(take(1)).subscribe(() => {
      requestAnimationFrame(() => this.updateIndicatorNow());
    });
  }

  /** Measure active tab button + write CSS vars on the list */
  private updateIndicatorNow() {
    const root = this.hostEl.nativeElement;

    const list = root.querySelector('.gv-tabs__list') as HTMLElement | null;
    if (!list) return;

    // ✅ No aria-selected query:
    // Find the active Tab component instance and use its actual button element.
    const activeTab =
      this.tabs?.find((t) => t.active && !t.disabled) ??
      (this.value ? this.tabs?.find((t) => t.value === this.value && !t.disabled) : null) ??
      null;

    const activeBtn = activeTab?.buttonEl ?? null;

    if (!activeBtn) {
      list.style.setProperty('--gv-tabs-indicator-width', `0px`);
      list.style.setProperty('--gv-tabs-indicator-left', `0px`);
      return;
    }

    const listRect = list.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();

    const left = btnRect.left - listRect.left;
    const width = btnRect.width;

    list.style.setProperty('--gv-tabs-indicator-left', `${left}px`);
    list.style.setProperty('--gv-tabs-indicator-width', `${width}px`);
  }
}
