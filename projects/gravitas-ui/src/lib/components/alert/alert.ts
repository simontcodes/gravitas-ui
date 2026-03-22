import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type GvAlertVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'gv-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Alert {
  @Input() variant: GvAlertVariant = 'info';
  @Input() title?: string;
  @Input({ transform: booleanAttribute }) dismissible = false;

  @Output() dismissed = new EventEmitter<void>();

  protected visible = true;

  @HostBinding('class.gv-alert')
  protected readonly baseClass = true;

  @HostBinding('class.gv-alert--neutral')
  get neutralClass(): boolean {
    return this.variant === 'neutral';
  }

  @HostBinding('class.gv-alert--info')
  get infoClass(): boolean {
    return this.variant === 'info';
  }

  @HostBinding('class.gv-alert--success')
  get successClass(): boolean {
    return this.variant === 'success';
  }

  @HostBinding('class.gv-alert--warning')
  get warningClass(): boolean {
    return this.variant === 'warning';
  }

  @HostBinding('class.gv-alert--danger')
  get dangerClass(): boolean {
    return this.variant === 'danger';
  }

  @HostBinding('attr.role')
  get role(): string {
    return this.variant === 'danger' || this.variant === 'warning' ? 'alert' : 'status';
  }

  onDismiss(): void {
    this.visible = false;
    this.dismissed.emit();
  }
}
