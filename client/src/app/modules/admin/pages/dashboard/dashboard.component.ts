import { Component, OnInit, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Role } from 'app/shared/models/data.model';
import { selectAdmin } from '../../store';
import { viewDashboard } from '../../store/view-dashboard/view-dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userData$ = this.store.pipe(
    select(selectAdmin),
    map((state) => state)
  );

  roles = Role;

  constructor(
    @Inject('API_BASE_URL') public apiUrl: string,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(viewDashboard());
  }
}
