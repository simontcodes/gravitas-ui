import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type GvBadgeVariant = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';

export type GvBadgeSize = 'sm' | 'md';

@Component({
  selector: 'gv-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Badge {
  @Input() variant: GvBadgeVariant = 'neutral';
  @Input() size: GvBadgeSize = 'md';
  @Input({ transform: booleanAttribute }) pill = false;
  @Input({ transform: booleanAttribute }) dot = false;

  @HostBinding('class.gv-badge')
  protected readonly baseClass = true;

  @HostBinding('class.gv-badge--neutral')
  get neutralClass(): boolean {
    return this.variant === 'neutral';
  }

  @HostBinding('class.gv-badge--primary')
  get primaryClass(): boolean {
    return this.variant === 'primary';
  }

  @HostBinding('class.gv-badge--success')
  get successClass(): boolean {
    return this.variant === 'success';
  }

  @HostBinding('class.gv-badge--warning')
  get warningClass(): boolean {
    return this.variant === 'warning';
  }

  @HostBinding('class.gv-badge--danger')
  get dangerClass(): boolean {
    return this.variant === 'danger';
  }

  @HostBinding('class.gv-badge--info')
  get infoClass(): boolean {
    return this.variant === 'info';
  }

  @HostBinding('class.gv-badge--sm')
  get smClass(): boolean {
    return this.size === 'sm';
  }

  @HostBinding('class.gv-badge--md')
  get mdClass(): boolean {
    return this.size === 'md';
  }

  @HostBinding('class.gv-badge--pill')
  get pillClass(): boolean {
    return this.pill;
  }

  @HostBinding('class.gv-badge--dot')
  get dotClass(): boolean {
    return this.dot;
  }
}
