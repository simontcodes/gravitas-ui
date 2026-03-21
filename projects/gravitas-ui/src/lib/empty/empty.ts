import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gv-empty',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './empty.html',
  styleUrl: './empty.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Empty {
  @Input() title = 'Nothing to show';
  @Input() description = '';

  @Input({ transform: booleanAttribute }) compact = false;

  @HostBinding('class.gv-empty')
  protected readonly baseClass = true;

  @HostBinding('class.gv-empty--compact')
  get compactClass(): boolean {
    return this.compact;
  }
}
