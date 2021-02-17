import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DashboardService } from '../../dashboard.service';
import * as LoginActions from './login.actions';
import * as RouterActions from 'app/shared/store/router/router.actions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.login),
      switchMap((action) =>
        this.dashboardService.login(action.payload).pipe(
          map(({ data }) =>
            LoginActions.loginSuccess({
              data,
              route: { path: ['/admin'] },
            })
          ),
          takeUntil(this.actions$.pipe(ofType(LoginActions.loginSuccess)))
        )
      )
    )
  );

  auth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.loginSuccess),
      map(({ route }) => RouterActions.routerNavigate({ route }))
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.logout),
      switchMap(() =>
        of(this.dashboardService.logout()).pipe(
          map(() =>
            RouterActions.routerNavigate({
              route: { path: ['/dashboard', 'login'] },
            })
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}
}
