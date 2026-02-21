import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

let nextId = 0;

@Component({
  selector: 'gv-form-field',
  standalone: true,
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormField {
  /** Visible label above the control */
  @Input() label: string | null = null;

  /** Shows a red asterisk next to label */
  @Input() required = false;

  /** Helper text (only shows when there is no error) */
  @Input() helperText: string | null = null;

  /** Error message (shows under the control) */
  @Input() error: string | null = null;

  /** Makes the field take full width */
  @Input() fullWidth = false;

  /**
   * Use this to connect label->control and error/helper -> aria-describedby.
   * Example: controlId="email"
   */
  @Input() controlId: string = `gv-ff-${++nextId}`;

  /** Optional: set to false to hide the label visually (keeps layout consistent) */
  @Input() showLabel = true;

  @HostBinding('class')
  get hostClass() {
    return ['gv-form-field', this.fullWidth ? 'w-100' : ''].filter(Boolean).join(' ');
  }

  get describedById(): string {
    return `${this.controlId}__desc`;
  }

  get hasError(): boolean {
    return !!(this.error && this.error.trim().length);
  }

  get hasHelper(): boolean {
    return !!(this.helperText && this.helperText.trim().length);
  }

  get describedByText(): string {
    if (this.hasError) return this.error!.trim();
    if (this.hasHelper) return this.helperText!.trim();
    return '';
  }
}