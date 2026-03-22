import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

export type GvTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'gv-tooltip-panel',
  standalone: true,
  template: `
    <div class="gv-tooltip-panel__inner">
      {{ text }}
      <span class="gv-tooltip-panel__arrow" aria-hidden="true"></span>
    </div>
  `,
  styleUrls: ['./tooltip.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GvTooltipPanelComponent {
  @Input() text = '';
  @Input() placement: GvTooltipPlacement = 'top';
  @Input() maxWidth = 240;

  @HostBinding('class')
  get hostClasses(): string {
    return `gv-tooltip-panel gv-tooltip-panel--${this.placement}`;
  }

  @HostBinding('style.max-width.px')
  get hostMaxWidth(): number {
    return this.maxWidth;
  }
}
