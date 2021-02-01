import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import * as RouterActions from './router.actions';

@Injectable()
export class RouterEffects {
  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RouterActions.routerNavigate),
        map((action) => action),
        tap(({ path, queryParams, extras }) =>
          this.router.navigate(path, { queryParams, ...extras })
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}
}
