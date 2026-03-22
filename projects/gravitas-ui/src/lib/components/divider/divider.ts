import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
  booleanAttribute,
} from '@angular/core';

export type GvDividerOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'gv-divider',
  standalone: true,
  templateUrl: './divider.html',
  styleUrls: ['./divider.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Divider {
  @Input() orientation: GvDividerOrientation = 'horizontal';
  @Input() label?: string;
  @Input({ transform: booleanAttribute }) inset = false;

  @HostBinding('class')
  get hostClasses(): string {
    return [
      'gv-divider-host',
      `gv-divider-host--${this.orientation}`,
      this.inset ? 'gv-divider-host--inset' : '',
      this.label ? 'gv-divider-host--with-label' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
