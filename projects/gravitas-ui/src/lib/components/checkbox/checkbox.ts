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

export type GvCheckboxSize = 'sm' | 'md' | 'lg';

let nextCheckboxId = 0;

@Component({
  selector: 'gv-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Checkbox),
      multi: true,
    },
  ],
})
export class Checkbox implements ControlValueAccessor {
  @Input() label = '';
  @Input() description = '';
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() size: GvCheckboxSize = 'md';
  @Input() inputId = `gv-checkbox-${++nextCheckboxId}`;
  @Input() name?: string;
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) required = false;

  private _indeterminate = false;

  @Input({ transform: booleanAttribute })
  set indeterminate(value: boolean) {
    this._indeterminate = value;
    this.syncIndeterminateState();
    this.cdr.markForCheck();
  }

  get indeterminate(): boolean {
    return this._indeterminate;
  }

  @Output() checkedChange = new EventEmitter<boolean>();

  @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;

  checked = false;
  focused = false;

  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'gv-checkbox-host',
      `gv-checkbox-host--${this.size}`,
      this.disabled ? 'gv-checkbox-host--disabled' : '',
      this.checked ? 'gv-checkbox-host--checked' : '',
      this.indeterminate ? 'gv-checkbox-host--indeterminate' : '',
      this.focused ? 'gv-checkbox-host--focused' : '',
      this.errorText ? 'gv-checkbox-host--error' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  writeValue(value: boolean | null): void {
    this.checked = !!value;
    if (this.checked && this.indeterminate) {
      this._indeterminate = false;
    }
    this.syncIndeterminateState();
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

    if (this.indeterminate) {
      this._indeterminate = false;
      input.indeterminate = false;
    }

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

  private syncIndeterminateState(): void {
    queueMicrotask(() => {
      if (this.inputRef?.nativeElement) {
        this.inputRef.nativeElement.indeterminate = this._indeterminate;
      }
    });
  }
}
