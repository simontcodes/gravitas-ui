import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

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

@Component({
  selector: 'gv-button',
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';

  @Input() disabled = false;
  @Input() loading = false;

  /** If true, applies Bootstrap's w-100 to make the button full width */
  @Input() fullWidth = false;

  /** Optional text to show while loading (ex: "Saving..."). If not set, shows normal content. */
  @Input() loadingText = '';

  /** Allows Bootstrap utility classes like "mt-3", "px-4" */
  @Input() className = '';

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get btnClass(): string {
    const sizeClass = this.size === 'md' ? '' : `btn-${this.size}`;
    const disabledClass = this.isDisabled ? 'disabled' : '';
    const widthClass = this.fullWidth ? 'w-100' : '';

    return [
      'btn',
      'gv-button',
      `btn-${this.variant}`,
      sizeClass,
      widthClass,
      disabledClass,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
