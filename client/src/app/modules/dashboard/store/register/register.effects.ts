import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { DashboardService } from '../../dashboard.service';
import * as RegisterActions from './register.actions';
import * as AlertActions from 'app/shared/store/alert/alert.actions';
import * as RouterActions from 'app/shared/store/router/router.actions';
import * as ToastActions from 'app/shared/store/toastr/toastr.actions';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      exhaustMap((action) =>
        this.dashboardService
          .register(action.payload)
          .pipe(
            map(() =>
              RouterActions.routerNavigate({ path: ['/dashboard', 'login'] })
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
