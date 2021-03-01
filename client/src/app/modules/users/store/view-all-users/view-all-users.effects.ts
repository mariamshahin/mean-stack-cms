import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { UsersService } from '../../users.service';
import * as UsersActions from './view-all-users.actions';

@Injectable()
export class AllUsersEffects {
  viewUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.viewUsers),
      switchMap(() =>
        this.usersService.viewAllUsers().pipe(
          map(({ data }) =>
            UsersActions.usersSuccess({
              users: data,
            })
          ),
          catchError((error) => of(UsersActions.usersFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(UsersActions.usersSuccess, UsersActions.usersFail)
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
