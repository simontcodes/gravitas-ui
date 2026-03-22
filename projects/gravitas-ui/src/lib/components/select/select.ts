import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type GvSelectSize = 'sm' | 'md' | 'lg';
export type SelectValue<T> = T | T[] | null;

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
  @Input() error: string | null = null;
  @Input() required = false;
  @Input() size: GvSelectSize = 'md';
  @Input() fullWidth = false;
  @Input() className = '';

  // --- Behavior ---
  @Input() multiple = false;
  @Input() searchable = false;
  @Input() searchPlaceholder = 'Search...';
  @Input() noResultsText = 'No results found';
  @Input() clearable = false;
  @Input() compareWith?: (a: T, b: T) => boolean;

  // --- Data ---
  @Input() options: GvSelectOption<T>[] = [];
  @Input() loading = false;
  @Input() loadingText = 'Loading...';

  // --- State ---
  value: SelectValue<T> = null;
  @Input() disabled = false;
  isOpen = false;
  searchTerm = '';

  private onChange: (value: SelectValue<T>) => void = () => {};
  private onTouched: () => void = () => {};

  private valueMap = new Map<string, T>();

  constructor(private host: ElementRef<HTMLElement>) {}

  @HostBinding('class.w-100')
  get hostFullWidth() {
    return this.fullWidth;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rebuildValueMap();

    if (changes['multiple']) {
      this.normalizeValueForMode();
    }
  }

  writeValue(value: SelectValue<T>): void {
    this.value = value;
    this.normalizeValueForMode();
  }

  registerOnChange(fn: (value: SelectValue<T>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private rebuildValueMap(): void {
    this.valueMap.clear();
    for (const opt of this.options ?? []) {
      this.valueMap.set(this.stringifyValue(opt.value), opt.value);
    }
  }

  private normalizeValueForMode(): void {
    if (this.multiple) {
      if (this.value == null) {
        this.value = [];
      } else if (!Array.isArray(this.value)) {
        this.value = [this.value];
      }
    } else {
      if (Array.isArray(this.value)) {
        this.value = this.value.length ? this.value[0] : null;
      }
    }
  }

  stringifyValue(v: T): string {
    return v === null || v === undefined ? '' : String(v as any);
  }

  private sameValue(a: T, b: T): boolean {
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;

    if (this.compareWith) {
      return this.compareWith(a, b);
    }

    return this.stringifyValue(a) === this.stringifyValue(b);
  }

  isSelected(v: T): boolean {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.some((x) => this.sameValue(x, v));
    }

    return this.value !== null && !Array.isArray(this.value) && this.sameValue(this.value, v);
  }

  isOptionDisabled(opt: GvSelectOption<T>): boolean {
    return !!opt.disabled || this.disabled || this.loading;
  }

  get filteredOptions(): GvSelectOption<T>[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.options ?? [];

    return (this.options ?? []).filter((opt) => opt.label.toLowerCase().includes(term));
  }

  get selectedOptions(): GvSelectOption<T>[] {
    return (this.options ?? []).filter((opt) => this.isSelected(opt.value));
  }

  get displayLabel(): string {
    if (this.multiple) {
      const selected = this.selectedOptions;
      if (!selected.length) return this.placeholder;
      if (selected.length <= 2) return selected.map((x) => x.label).join(', ');
      return `${selected.length} selected`;
    }

    const selected = (this.options ?? []).find((opt) => this.isSelected(opt.value));
    return selected?.label || this.placeholder;
  }

  get useCustomDropdown(): boolean {
    return this.multiple || this.searchable;
  }

  get selectClass(): string {
    const sizeClass = this.size === 'md' ? '' : `form-select-${this.size}`;
    const invalidClass = this.error ? 'is-invalid' : '';
    const widthClass = this.fullWidth ? 'w-100' : '';

    return ['form-select', sizeClass, invalidClass, widthClass, this.className]
      .filter(Boolean)
      .join(' ');
  }

  get triggerClass(): string {
    const invalidClass = this.error ? 'is-invalid' : '';
    const widthClass = this.fullWidth ? 'w-100' : '';

    return ['gv-select-trigger', invalidClass, widthClass, this.className]
      .filter(Boolean)
      .join(' ');
  }

  // --- Native single select mode ---
  handleNativeChange(event: Event): void {
    const raw = (event.target as HTMLSelectElement).value;

    if (raw === '') {
      this.value = null;
      this.onChange(null);
      return;
    }

    const mapped = this.valueMap.get(raw) ?? (raw as unknown as T);
    this.value = mapped;
    this.onChange(mapped);
  }

  // --- Custom dropdown mode ---
  toggleOpen(): void {
    if (this.disabled || this.loading) return;
    this.isOpen = !this.isOpen;

    if (!this.isOpen) {
      this.searchTerm = '';
      this.onTouched();
    }
  }

  open(): void {
    if (this.disabled || this.loading) return;
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
    this.searchTerm = '';
    this.onTouched();
  }

  selectOption(opt: GvSelectOption<T>): void {
    if (this.isOptionDisabled(opt)) return;

    if (this.multiple) {
      const current = Array.isArray(this.value) ? [...this.value] : [];
      const exists = current.some((v) => this.sameValue(v, opt.value));

      this.value = exists
        ? current.filter((v) => !this.sameValue(v, opt.value))
        : [...current, opt.value];

      this.onChange(this.value);
      return;
    }

    this.value = opt.value;
    this.onChange(opt.value);
    this.close();
  }

  removeSelected(opt: GvSelectOption<T>, event?: MouseEvent): void {
    event?.stopPropagation();

    if (!this.multiple || !Array.isArray(this.value)) return;

    this.value = this.value.filter((v) => !this.sameValue(v, opt.value));
    this.onChange(this.value);
  }

  clear(event?: MouseEvent): void {
    event?.stopPropagation();
    this.value = this.multiple ? [] : null;
    this.onChange(this.value);
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByValue = (_: number, opt: GvSelectOption<T>) => this.stringifyValue(opt.value);

  handleBlur(): void {
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node) && this.isOpen) {
      this.close();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) this.close();
  }
}
