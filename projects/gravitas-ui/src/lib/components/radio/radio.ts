import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type GvRadioSize = 'sm' | 'md' | 'lg';

let nextRadioId = 0;

@Component({
  selector: 'gv-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.html',
  styleUrls: ['./radio.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Radio),
      multi: true,
    },
  ],
})
export class Radio implements ControlValueAccessor {
  @Input() label = '';
  @Input() description = '';
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() size: GvRadioSize = 'md';
  @Input() inputId = `gv-radio-${++nextRadioId}`;
  @Input() name?: string;
  @Input() value: unknown = true;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) required = false;

  @Output() valueChange = new EventEmitter<unknown>();

  @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;

  modelValue: unknown = null;
  focused = false;

  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'gv-radio-host',
      `gv-radio-host--${this.size}`,
      this.disabled ? 'gv-radio-host--disabled' : '',
      this.checked ? 'gv-radio-host--checked' : '',
      this.focused ? 'gv-radio-host--focused' : '',
      this.errorText ? 'gv-radio-host--error' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get checked(): boolean {
    return this.modelValue === this.value;
  }

  writeValue(value: unknown): void {
    this.modelValue = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  handleInputChange(event: Event): void {
    if (this.disabled) {
      return;
    }

    const input = event.target as HTMLInputElement;

    if (!input.checked) {
      return;
    }

    this.modelValue = this.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.cdr.markForCheck();
  }

  handleBlur(): void {
    this.focused = false;
    this.onTouched();
    this.cdr.markForCheck();
  }

  handleFocus(): void {
    this.focused = true;
    this.cdr.markForCheck();
  }
}
