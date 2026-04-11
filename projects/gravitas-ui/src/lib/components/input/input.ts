import { Component, Input, ChangeDetectionStrategy, Optional, Self, computed } from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { FormField } from '../form-field/form-field';

type InputSize = 'sm' | 'md' | 'lg';
type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'datetime-local';

@Component({
  selector: 'gv-input',
  standalone: true,
  imports: [NgClass, FormField],
  templateUrl: './input.html',
  styleUrl: './input.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor {
  private readonly generatedId = `gv-input-${Math.random().toString(16).slice(2)}`;

  @Input() id?: string;

  @Input() label?: string;
  @Input() placeholder = '';
  @Input() hint?: string;
  @Input({ alias: 'helperText' }) set helperText(value: string | undefined) {
    this.hint = value;
  }

  /** If set, overrides control-based validation UI */
  @Input() error?: string;

  @Input() type: InputType = 'text';
  @Input() size: InputSize = 'md';
  @Input() disabled = false;
  @Input() readonly = false;

  /** Bootstrap utilities */
  @Input() className = '';

  /** Show required asterisk (doesn't enforce validation) */
  @Input() required = false;

  /** Optional projected "prefix" / "suffix" areas */
  @Input() hasPrefix = false;
  @Input() hasSuffix = false;

  // ---- forms glue (Reactive + Template-driven) ----
  value: string | number | null = null;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // --- computed state ---
  private control = computed(() => this.ngControl?.control ?? null);

  readonly isInvalid = computed(() => {
    if (this.error) return true;
    const c = this.control();
    return !!c && c.invalid && (c.dirty || c.touched);
  });

  get inputId(): string {
    return this.id ?? this.generatedId;
  }

  get describedBy(): string {
    return this.fieldHelperText || this.errorText ? `${this.inputId}__desc` : '';
  }

  get fieldHelperText(): string | null {
    return !this.isInvalid() && this.hint ? this.hint : null;
  }

  get isDateLike(): boolean {
    return this.type === 'date' || this.type === 'datetime-local';
  }

  get inputClasses(): string {
    const sizeClass = this.size === 'md' ? '' : `form-control-${this.size}`;
    return ['form-control', sizeClass, this.isInvalid() ? 'is-invalid' : '', this.className]
      .filter(Boolean)
      .join(' ');
  }

  get errorText(): string | null {
    if (this.error) return this.error;

    const c = this.ngControl?.control;
    if (!c) return null;

    const show = c.invalid && (c.touched || c.dirty);
    if (!show) return null;

    const e = c.errors ?? {};

    if (e['required']) return 'This field is required.';
    if (e['minlength']) return `Must be at least ${e['minlength'].requiredLength} characters long.`;
    if (e['maxlength']) return `Must be at most ${e['maxlength'].requiredLength} characters long.`;
    if (e['email']) return 'Please enter a valid email address.';

    return 'Invalid value.';
  }

  // DOM event handlers
  handleInput(value: string) {
    const casted = this.type === 'number' ? (value === '' ? null : Number(value)) : value;
    this.value = casted;
    this.onChange(casted);
  }

  handleBlur() {
    this.onTouched();
  }
}
