import { Component, HostBinding, Input } from '@angular/core';

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
  active = false;

  @HostBinding('class.gv-tab-panel-host') host = true;
}
