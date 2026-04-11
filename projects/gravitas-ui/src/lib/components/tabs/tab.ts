import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  Optional,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Tabs } from './tabs';

@Component({
  selector: 'gv-tab',
  standalone: true,
  styleUrls: ['./tabs.css'],
  template: `
    <button
      #btn
      class="gv-tab"
      type="button"
      role="tab"
      [attr.aria-selected]="active"
      [attr.aria-disabled]="disabled"
      [attr.tabindex]="tabIndex"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class Tab {
  @Input({ required: true }) value!: string;
  @Input() disabled = false;

  private _active = false;

  @ViewChild('btn', { read: ElementRef })
  private _btn!: ElementRef<HTMLButtonElement>;

  get active() {
    return this._active;
  }

  set active(next: boolean) {
    if (this._active === next) return;
    this._active = next;
    this.cdr.markForCheck();
  }

  get buttonEl(): HTMLButtonElement | null {
    return this._btn?.nativeElement ?? null;
  }

  constructor(
    @Optional() private tabs: Tabs | null,
    private cdr: ChangeDetectorRef
  ) {}

  get tabIndex() {
    return this.active && !this.disabled ? 0 : -1;
  }

  @HostListener('click')
  onClick() {
    if (this.disabled) return;
    this.tabs?.setValue(this.value);
  }

  @HostListener('keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (!this.tabs) return;

    const key = e.key;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' '].includes(key)) return;

    e.preventDefault();

    const tabs = this.tabs.tabs.toArray().filter((t) => !t.disabled);
    if (!tabs.length) return;

    const idx = tabs.findIndex((t) => t.value === this.tabs!.value);

    const focusTab = (t: Tab) => t.buttonEl?.focus();

    if (key === 'Enter' || key === ' ') {
      this.tabs.setValue(this.value);
      return;
    }

    let next: Tab;
    if (key === 'Home') next = tabs[0];
    else if (key === 'End') next = tabs[tabs.length - 1];
    else if (key === 'ArrowRight') next = tabs[(idx + 1 + tabs.length) % tabs.length];
    else next = tabs[(idx - 1 + tabs.length) % tabs.length];

    this.tabs.setValue(next.value);
    focusTab(next);
  }
}
