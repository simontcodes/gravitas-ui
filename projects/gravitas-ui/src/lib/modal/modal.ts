import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  HostListener,
  ViewChild,
} from '@angular/core';

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
type CloseReason = 'backdrop' | 'esc' | 'button';

let nextId = 0;

@Component({
  selector: 'gv-modal',
  templateUrl: './modal.html',
  styleUrl: './modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Modal implements OnChanges, OnDestroy {
  @Input() open = false;

  @Input() title?: string;
  @Input() subtitle?: string;

  @Input() size: ModalSize = 'md';

  /** UX controls */
  @Input() closeOnBackdrop = true;
  @Input() closeOnEsc = true;

  /** When true, disables closing + shows overlayed spinner area (optional UI in CSS) */
  @Input() loading = false;

  /** Allows extra utility classes on the panel (ex: "border-0") */
  @Input() panelClass = '';

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<CloseReason>();

  @ViewChild('panel', { static: false }) panelRef?: ElementRef<HTMLElement>;

  readonly titleId = `gv-modal-title-${++nextId}`;

  private prevBodyOverflow: string | null = null;
  private prevFocused: HTMLElement | null = null;

  get sizeClass(): string {
    return `gv-modal--${this.size}`;
  }

  get panelClasses(): string {
    return ['gv-modal__panel', this.sizeClass, this.panelClass].filter(Boolean).join(' ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']) {
      if (this.open) this.onOpen();
      else this.onCloseCleanup();
    }
  }

  ngOnDestroy(): void {
    // in case component is destroyed while open
    this.onCloseCleanup();
  }

  /** Close triggers */
  onBackdropMouseDown(): void {
    if (!this.open) return;
    if (this.loading) return;
    if (!this.closeOnBackdrop) return;
    this.requestClose('backdrop');
  }

  onCloseButton(): void {
    if (!this.open) return;
    if (this.loading) return;
    this.requestClose('button');
  }

  @HostListener('document:keydown', ['$event'])
  onDocKeydown(e: KeyboardEvent): void {
    if (!this.open) return;

    if (e.key === 'Escape') {
      if (this.loading) return;
      if (!this.closeOnEsc) return;
      e.preventDefault();
      this.requestClose('esc');
      return;
    }

    // super-light focus trap (v1)
    if (e.key === 'Tab') {
      this.trapFocus(e);
    }
  }

  private requestClose(reason: CloseReason): void {
    this.openChange.emit(false);
    this.closed.emit(reason);
  }

  private onOpen(): void {
    this.prevFocused = document.activeElement as HTMLElement | null;
    this.lockBodyScroll();

    // focus the panel (or first focusable) on next tick
    queueMicrotask(() => {
      const panel = this.panelRef?.nativeElement;
      if (!panel) return;

      const focusable = this.getFocusable(panel);
      (focusable[0] ?? panel).focus?.();
    });
  }

  private onCloseCleanup(): void {
    this.unlockBodyScroll();
    // restore focus
    queueMicrotask(() => this.prevFocused?.focus?.());
    this.prevFocused = null;
  }

  private lockBodyScroll(): void {
    const body = document.body;
    if (this.prevBodyOverflow === null) {
      this.prevBodyOverflow = body.style.overflow || '';
      body.style.overflow = 'hidden';
    }
  }

  private unlockBodyScroll(): void {
    if (this.prevBodyOverflow === null) return;
    document.body.style.overflow = this.prevBodyOverflow;
    this.prevBodyOverflow = null;
  }

  private trapFocus(e: KeyboardEvent): void {
    const panel = this.panelRef?.nativeElement;
    if (!panel) return;

    const focusable = this.getFocusable(panel);
    if (focusable.length === 0) {
      e.preventDefault();
      panel.focus?.();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (e.shiftKey) {
      if (!active || active === first || !panel.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (!active || active === last || !panel.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  private getFocusable(root: HTMLElement): HTMLElement[] {
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'),
    );
  }
}
