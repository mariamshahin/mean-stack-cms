import { Component, Input, Inject, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { DashboardState, selectDashboard } from 'app/modules/dashboard/store';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @Input() width = 50;
  @Input() height = 50;

  userData$ = this.store.pipe(
    select(selectDashboard),
    map((state) => state.login.data?.user)
  );

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store<DashboardState>
  ) {}
}
