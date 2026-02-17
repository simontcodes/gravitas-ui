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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';

  @Input() disabled = false;
  @Input() loading = false;

  /** Allows Bootstrap utility classes like "w-100 mt-3" */
  @Input() className = '';

  get btnClass(): string {
    const sizeClass = this.size === 'md' ? '' : `btn-${this.size}`;
    const disabledClass = this.disabled || this.loading ? 'disabled' : '';

    return [
      'btn',
      `btn-${this.variant}`,
      sizeClass,
      disabledClass,
      this.className,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
