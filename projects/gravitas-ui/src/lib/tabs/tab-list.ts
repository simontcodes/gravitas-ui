import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'gv-tab-list',
  styleUrls: ['./tabs.css'],
  standalone: true,
  template: `<div class="gv-tabs__list" role="tablist"><ng-content></ng-content></div>`,
})
export class TabList {
  @HostBinding('class.gv-tabs') hostClass = true;
}
