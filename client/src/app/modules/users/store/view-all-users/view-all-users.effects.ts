import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from '../../users.service';
import * as UsersActions from './view-all-users.actions';

@Injectable()
export class AllUsersEffects {
  viewUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.viewUsers),
      switchMap((action) =>
        this.usersService.viewAllUsers().pipe(
          map(({ data }) =>
            UsersActions.usersSuccess({
              users: data,
            })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
