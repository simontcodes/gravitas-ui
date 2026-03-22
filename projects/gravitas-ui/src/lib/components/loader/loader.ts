import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GvLoaderVariant = 'spinner' | 'dots';
export type GvLoaderSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'gv-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loader {
  @Input() variant: GvLoaderVariant = 'spinner';
  @Input() size: GvLoaderSize = 'md';
  @Input() label?: string;
  @Input() inline = false;
  @Input() overlay = false;
  @Input() centered = false;

  @HostBinding('class.gv-loader')
  protected readonly baseClass = true;

  @HostBinding('class.gv-loader--inline')
  get inlineClass(): boolean {
    return this.inline;
  }

  @HostBinding('class.gv-loader--overlay')
  get overlayClass(): boolean {
    return this.overlay;
  }

  @HostBinding('class.gv-loader--centered')
  get centeredClass(): boolean {
    return this.centered;
  }

  @HostBinding('class.gv-loader--spinner')
  get spinnerClass(): boolean {
    return this.variant === 'spinner';
  }

  @HostBinding('class.gv-loader--dots')
  get dotsClass(): boolean {
    return this.variant === 'dots';
  }

  @HostBinding('class.gv-loader--sm')
  get smClass(): boolean {
    return this.size === 'sm';
  }

  @HostBinding('class.gv-loader--md')
  get mdClass(): boolean {
    return this.size === 'md';
  }

  @HostBinding('class.gv-loader--lg')
  get lgClass(): boolean {
    return this.size === 'lg';
  }

  get ariaLabel(): string {
    return this.label?.trim() || 'Loading...';
  }

  get showVisibleLabel(): boolean {
    return !!this.label?.trim();
  }

  get dots(): number[] {
    return [0, 1, 2];
  }
}
