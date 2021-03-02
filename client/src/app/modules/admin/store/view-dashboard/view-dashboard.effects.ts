import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import * as DashboardActions from './view-dashboard.actions';

@Injectable()
export class DashboardEffects {
  viewDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.viewDashboard),
      switchMap((action) =>
        this.adminService.getDashboardData().pipe(
          map(({ data }) =>
            DashboardActions.dashboardSuccess({
              data,
            })
          ),
          catchError((error) => of(DashboardActions.dashboardFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(
                DashboardActions.dashboardSuccess,
                DashboardActions.dashboardFail
              )
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private adminService: AdminService) {}
}
