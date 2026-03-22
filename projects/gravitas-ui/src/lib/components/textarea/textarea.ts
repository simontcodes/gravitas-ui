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

export type GvTextareaSize = 'sm' | 'md' | 'lg';
export type GvTextareaResize = 'none' | 'vertical' | 'both';

let nextTextareaId = 0;

@Component({
  selector: 'gv-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.html',
  styleUrls: ['./textarea.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Textarea),
      multi: true,
    },
  ],
})
export class Textarea implements ControlValueAccessor {
  @Input() label = '';
  @Input() description = '';
  @Input() helperText = '';
  @Input() errorText = '';
  @Input() placeholder = '';
  @Input() inputId = `gv-textarea-${++nextTextareaId}`;
  @Input() name?: string;
  @Input() rows = 4;
  @Input() size: GvTextareaSize = 'md';
  @Input() resize: GvTextareaResize = 'vertical';
  @Input() maxLength?: number;

  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) required = false;
  @Input({ transform: booleanAttribute }) readonly = false;

  @Output() valueChange = new EventEmitter<string>();

  value = '';
  focused = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'gv-textarea-host',
      `gv-textarea-host--${this.size}`,
      `gv-textarea-host--resize-${this.resize}`,
      this.disabled ? 'gv-textarea-host--disabled' : '',
      this.focused ? 'gv-textarea-host--focused' : '',
      this.errorText ? 'gv-textarea-host--error' : '',
      this.readonly ? 'gv-textarea-host--readonly' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  get characterCount(): number {
    return this.value?.length ?? 0;
  }

  writeValue(value: string | null): void {
    this.value = value ?? '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cdr.markForCheck();
  }

  handleInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.cdr.markForCheck();
  }

  handleFocus(): void {
    this.focused = true;
    this.cdr.markForCheck();
  }

  handleBlur(): void {
    this.focused = false;
    this.onTouched();
    this.cdr.markForCheck();
  }
}