import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { UsersService } from '../../users.service';
import * as UserActions from './view-single-user.actions';
import * as RouterActions from 'app/shared/store/router/router.actions';

@Injectable()
export class UserEffects {
  viewSingleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.viewSingleUser),
      switchMap((action) =>
        this.usersService.viewSingleUser(action.id).pipe(
          map(({ data }) =>
            UserActions.userSuccess({
              user: data,
            })
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ id }) =>
        this.usersService.deleteUser(id).pipe(
          map(() =>
            RouterActions.routerNavigate({
              route: { path: ['/admin', 'users'] },
            })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
