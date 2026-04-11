import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'
  | 'link';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonAppearance = 'solid' | 'soft' | 'outline' | 'ghost' | 'link';

@Component({
  selector: 'gv-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  @ViewChild('buttonElement', { static: true })
  buttonElement?: ElementRef<HTMLButtonElement>;

  /** Native button type attribute. */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** Visual style variant. Maps to Bootstrap variants (btn-*) with Gravitas styling. */
  @Input() variant: ButtonVariant = 'primary';

  /** Visual treatment independent from semantic variant. */
  @Input() appearance: ButtonAppearance = 'solid';

  /** Size variant. Maps to Bootstrap size classes (btn-sm / btn-lg). */
  @Input() size: ButtonSize = 'md';

  /** Disables the button. */
  @Input() disabled = false;

  /** Shows a busy state (disables button + shows spinner). */
  @Input() loading = false;

  /** If true, makes the button full width. */
  @Input() fullWidth = false;

  /** Optional label shown while loading (ex: "Saving..."). If empty, shows normal content. */
  @Input() loadingText = '';

  /** Extra CSS classes applied to the button element (ex: "mt-3 px-4"). */
  @Input() className = '';

  get nativeButton(): HTMLButtonElement | null {
    return this.buttonElement?.nativeElement ?? null;
  }

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get btnClass(): string {
    const sizeClass = this.size === 'md' ? '' : `btn-${this.size}`;
    const disabledClass = this.isDisabled ? 'disabled' : '';
    const widthClass = this.fullWidth ? 'w-100' : '';
    const appearanceClass = `gv-button--appearance-${this.resolvedAppearance}`;
    const variantClass = `gv-button--variant-${this.variant}`;

    return [
      'btn',
      'gv-button',
      sizeClass,
      widthClass,
      disabledClass,
      appearanceClass,
      variantClass,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }

  get resolvedAppearance(): ButtonAppearance {
    if (this.appearance === 'solid' && this.variant === 'link') {
      return 'link';
    }
    return this.appearance;
  }

  focus(): void {
    this.nativeButton?.focus();
  }
}
