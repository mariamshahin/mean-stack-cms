import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { DashboardService } from '../../dashboard.service';
import { User } from 'app/shared/models/data.model';
import * as RegisterActions from './register.actions';
import * as LoginActions from '../login/login.actions';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      switchMap((action) =>
        this.dashboardService.register(action.payload).pipe(
          map((data: User) =>
            LoginActions.loginSuccess({
              data,
              route: {
                path: ['/admin', 'profile'],
                extras: { state: { redirect: true } },
              },
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
