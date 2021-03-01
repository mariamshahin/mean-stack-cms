import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { UsersService } from '../../users.service';
import * as UserActions from './view-single-user.actions';
import * as RouterActions from 'app/shared/store/router/router.actions';

@Injectable()
export class SingleUserEffects {
  viewSingleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.viewSingleUser),
      switchMap((action) =>
        this.usersService.viewSingleUser(action.id).pipe(
          map(({ data }) =>
            UserActions.userSuccess({
              user: data,
            })
          ),
          catchError((error) => of(UserActions.userFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(UserActions.userSuccess, UserActions.userFail)
            )
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
          map(({ message }) =>
            UserActions.deleteSuccess({ response: message })
          ),
          catchError((error) => of(UserActions.deleteFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(UserActions.deleteSuccess, UserActions.deleteFail)
            )
          )
        )
      )
    )
  );

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteSuccess),
      map(() =>
        RouterActions.routerNavigate({
          route: { path: ['/admin', 'users'] },
        })
      )
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
