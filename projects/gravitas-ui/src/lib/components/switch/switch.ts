import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
  booleanAttribute,
  forwardRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type GvSwitchSize = 'sm' | 'md' | 'lg';

let nextSwitchId = 0;

@Component({
  selector: 'gv-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.html',
  styleUrls: ['./switch.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Switch),
      multi: true,
    },
  ],
})
export class Switch implements ControlValueAccessor {
  private readonly generatedId = `gv-switch-${++nextSwitchId}`;

  @Input() label = '';
  @Input() description = '';
  @Input() helperText = '';
  @Input() errorText = '';
  @Input({ alias: 'error' }) set error(value: string | null | undefined) {
    this.errorText = value ?? '';
  }
  @Input() size: GvSwitchSize = 'md';
  @Input() inputId = this.generatedId;
  @Input({ alias: 'id' }) set id(value: string | null | undefined) {
    this.inputId = value?.trim() || this.generatedId;
  }
  @Input() name?: string;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) required = false;

  @Output() checkedChange = new EventEmitter<boolean>();

  checked = false;
  focused = false;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'gv-switch-host',
      `gv-switch-host--${this.size}`,
      this.disabled ? 'gv-switch-host--disabled' : '',
      this.checked ? 'gv-switch-host--checked' : '',
      this.focused ? 'gv-switch-host--focused' : '',
      this.errorText ? 'gv-switch-host--error' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  writeValue(value: boolean | null): void {
    this.checked = !!value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: boolean) => void): void {
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
    this.checked = input.checked;
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
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
