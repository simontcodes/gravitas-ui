import { Component, Input, ChangeDetectionStrategy, forwardRef, HostBinding, OnChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type GvSelectSize = 'sm' | 'md' | 'lg';

export interface GvSelectOption<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'gv-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrls: ['./select.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
})
export class Select<T = any> implements ControlValueAccessor, OnChanges {
  // --- UI ---
  @Input() label = '';
  @Input() helperText = '';
  @Input() placeholder = 'Select...';

  /** Pass a string to force an error message, or leave empty to rely on control validation messaging in the host app */
  @Input() error: string | null = null;

  @Input() required = false;

  @Input() size: GvSelectSize = 'md';
  @Input() fullWidth = false;

  /** Bootstrap utility classes (ex: "mt-3 w-100") */
  @Input() className = '';

  // --- Data ---
  @Input() options: GvSelectOption<T>[] = [];

  /** Optional: show a loading state (useful when options come from API) */
  @Input() loading = false;
  @Input() loadingText = 'Loading...';

  // --- State (CVA) ---
  value: T | null = null;
  disabled = false;

  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  @HostBinding('class.w-100') get hostFullWidth() {
    return this.fullWidth;
  }

  private valueMap = new Map<string, T>();

  ngOnChanges() {
  // keep a map from string -> real value, so we don’t lose types
  this.valueMap.clear();
  for (const opt of this.options ?? []) {
    this.valueMap.set(this.stringifyValue(opt.value), opt.value);
  }
}

  writeValue(value: T | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  stringifyValue(v: T): string {
    // stable-ish key for primitives. For objects, user should pass primitive IDs.
    return v === null || v === undefined ? '' : String(v as any);
  }

  isSelected(v: T): boolean {
    return this.value !== null && this.stringifyValue(this.value) === this.stringifyValue(v);
  }

  get selectClass(): string {
    const sizeClass = this.size === 'md' ? '' : `form-select-${this.size}`;
    const invalidClass = this.error ? 'is-invalid' : '';
    const widthClass = this.fullWidth ? 'w-100' : '';

    return ['form-select', sizeClass, invalidClass, widthClass, this.className]
      .filter(Boolean)
      .join(' ');
  }

  handleNativeChange(event: Event) {
    const raw = (event.target as HTMLSelectElement).value;

    // placeholder selected
    if (raw === '') {
      this.value = null;
      this.onChange(null);
      return;
    }

    const mapped = this.valueMap.get(raw) ?? (raw as unknown as T);
    this.value = mapped;
    this.onChange(mapped);
  }

  /** For HTML <option> value binding, we need a stable serialization */
  trackByIndex(index: number) {
    return index;
  }

  handleChange(raw: any) {
    // Raw will come from <select> (string) unless using [ngValue] on <option>
    // We'll use [ngValue] so raw becomes the actual value.
    this.value = raw;
    this.onChange(raw);
  }

  handleBlur() {
    this.onTouched();
  }
}
