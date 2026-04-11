import { ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'gv-tab-panel',
  styleUrls: ['./tabs.css'],
  standalone: true,
  template: `
    <div class="gv-tab-panel" role="tabpanel" [hidden]="!active">
      <ng-content></ng-content>
    </div>
  `,
})
export class TabPanel {
  @Input({ required: true }) value!: string;
  private _active = false;

  @HostBinding('class.gv-tab-panel-host') host = true;

  get active() {
    return this._active;
  }

  set active(next: boolean) {
    if (this._active === next) return;
    this._active = next;
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef) {}
}
