import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountComponent {
  activeTab = 'edit-profile';

  constructor() {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
