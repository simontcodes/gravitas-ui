import { Component } from '@angular/core';

@Component({
  selector: 'gv-tab-panels',
  styleUrls: ['./tabs.css'],
  standalone: true,
  template: `<div class="gv-tabs__panels"><ng-content></ng-content></div>`,
})
export class TabPanels {}
