import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  withLatestFrom,
} from 'rxjs/operators';
import * as RegisterActions from './register.actions';
import * as AlertActions from 'app/shared/store/alert/alert.actions';
import * as RouterActions from 'app/shared/store/router/router.actions';
import { DashboardService } from '../../dashboard.service';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      exhaustMap((action) =>
        this.dashboardService.register(action.payload).pipe(
          map(() =>
            RouterActions.routerNavigate({ path: ['/dashboard', 'login'] })
          ),
          catchError((error) =>
            of(AlertActions.openAlert({ message: error.error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private router: Router
  ) {}
}
