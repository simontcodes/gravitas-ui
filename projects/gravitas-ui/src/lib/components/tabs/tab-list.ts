import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'gv-tab-list',
  styleUrls: ['./tabs.css'],
  standalone: true,
  template: `
    <div class="gv-tabs__list" role="tablist">
      <ng-content></ng-content>

      <!-- Single moving underline -->
      <span class="gv-tabs__indicator" aria-hidden="true"></span>
    </div>
  `,
})
export class TabList {
  @HostBinding('class.gv-tabs') hostClass = true;
}