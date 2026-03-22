import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
  booleanAttribute,
} from '@angular/core';

export type GvIconButtonVariant = 'default' | 'ghost' | 'primary' | 'danger';
export type GvIconButtonSize = 'sm' | 'md' | 'lg';
export type GvIconButtonShape = 'rounded' | 'circle' | 'square';
export type GvIconButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'gv-icon-button',
  standalone: true,
  templateUrl: './icon-button.html',
  styleUrls: ['./icon-button.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButton {
  @Input() ariaLabel = '';
  @Input() variant: GvIconButtonVariant = 'default';
  @Input() size: GvIconButtonSize = 'md';
  @Input() shape: GvIconButtonShape = 'rounded';
  @Input() type: GvIconButtonType = 'button';
  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) active = false;

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'gv-icon-button-host',
      `gv-icon-button-host--${this.size}`,
      `gv-icon-button-host--${this.variant}`,
      `gv-icon-button-host--${this.shape}`,
      this.active ? 'gv-icon-button-host--active' : '',
      this.disabled ? 'gv-icon-button-host--disabled' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }

  onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.buttonClick.emit(event);
  }
}
