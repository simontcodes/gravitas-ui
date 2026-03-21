import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type GvSkeletonVariant = 'text' | 'rect' | 'circle';

@Component({
  selector: 'gv-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skeleton {
  @Input() variant: GvSkeletonVariant = 'rect';
  @Input() width?: string;
  @Input() height?: string;
  @Input() lines = 1;
  @Input() animated = true;

  @HostBinding('class.gv-skeleton')
  protected readonly baseClass = true;

  @HostBinding('class.gv-skeleton--animated')
  get animatedClass(): boolean {
    return this.animated;
  }

  @HostBinding('class.gv-skeleton--text')
  get textClass(): boolean {
    return this.variant === 'text';
  }

  @HostBinding('class.gv-skeleton--rect')
  get rectClass(): boolean {
    return this.variant === 'rect';
  }

  @HostBinding('class.gv-skeleton--circle')
  get circleClass(): boolean {
    return this.variant === 'circle';
  }

  @HostBinding('style.--gv-skeleton-width')
  get skeletonWidth(): string | null {
    return this.hostWidth;
  }

  @HostBinding('style.--gv-skeleton-height')
  get skeletonHeight(): string | null {
    return this.hostHeight;
  }

  get resolvedLines(): number[] {
    const total = this.variant === 'text' ? Math.max(1, this.lines) : 1;
    return Array.from({ length: total }, (_, index) => index);
  }

  get hostWidth(): string | null {
    return this.width?.trim() || null;
  }

  get hostHeight(): string | null {
    if (this.height?.trim()) {
      return this.height.trim();
    }

    if (this.variant === 'text') {
      return null;
    }

    if (this.variant === 'circle') {
      return this.hostWidth || '2.5rem';
    }

    return '1rem';
  }

  lineWidth(index: number): string | null {
    if (this.variant !== 'text') {
      return null;
    }

    if (this.width?.trim()) {
      return this.width.trim();
    }

    const widths = ['100%', '92%', '84%', '76%'];
    return widths[index % widths.length];
  }
}
