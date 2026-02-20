import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  HostBinding,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'gv-card',
  templateUrl: './card.html',
  styleUrl: './card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  @Input() title: string | null = null;
  @Input() subtitle: string | null = null;

  /** Force header on/off. null = auto (shows if title/subtitle/actions exist) */
  @Input() showHeader: boolean | null = null;

  /** Makes the card fill its container height */
  @Input() fullHeight = false;

  /** Enables hover/press styles + click behavior */
  @Input() interactive = false;

  /** Disables interactions (no hover, no click, no keyboard activation) */
  @Input() disabled = false;

  /** Extra classes (Bootstrap utilities etc.) */
  @Input() className = '';

  @Output() cardClick = new EventEmitter<MouseEvent | KeyboardEvent>();

  /** Accessibility: only focusable when interactive and not disabled */
  @HostBinding('attr.role') get roleAttr() {
    return this.interactive && !this.disabled ? 'button' : null;
  }

  @HostBinding('attr.tabindex') get tabIndexAttr() {
    return this.interactive && !this.disabled ? 0 : null;
  }

  @HostBinding('attr.aria-disabled') get ariaDisabled() {
    return this.interactive ? String(this.disabled) : null;
  }

  get hasHeader(): boolean {
    if (this.showHeader === true) return true;
    if (this.showHeader === false) return false;

    // auto: show when there's title/subtitle OR projected actions slot exists
    // We can't easily detect slot content without more complexity, so:
    return !!this.title || !!this.subtitle;
  }

  get cardClass(): string {
    const classes = [
      'gv-card',
      this.fullHeight ? 'h-100' : '',
      this.interactive ? 'gv-card--interactive' : '',
      this.disabled ? 'gv-card--disabled' : '',
      this.className,
    ];

    return classes.filter(Boolean).join(' ');
  }

  @HostListener('click', ['$event'])
  onHostClick(event: MouseEvent) {
    if (!this.interactive || this.disabled) return;
    this.cardClick.emit(event);
  }

  @HostListener('keydown', ['$event'])
  onHostKeydown(event: KeyboardEvent) {
    if (!this.interactive || this.disabled) return;

    // Keyboard activation
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.cardClick.emit(event);
    }
  }
}
