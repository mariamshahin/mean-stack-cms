import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { UsersService } from '../../users.service';
import * as RoleActions from './change-user-role.actions';
import * as UserActions from '../view-single-user/view-single-user.actions';

@Injectable()
export class RoleEffects {
  changeUserRole$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.changeUserRole),
      switchMap((action) =>
        this.usersService
          .changeUserRole({ id: action.id, data: action.data })
          .pipe(
            map(({ data }) =>
              RoleActions.changeRoleSuccess({
                user: data,
              })
            ),
            catchError((error) => of(RoleActions.changeRoleFail({ error }))),
            takeUntil(
              this.actions$.pipe(
                ofType(
                  RoleActions.changeRoleSuccess,
                  RoleActions.changeRoleFail
                )
              )
            )
          )
      )
    )
  );

  updateUserView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RoleActions.changeRoleSuccess),
      map(({ user }) => UserActions.viewSingleUser({ id: user._id }))
    )
  );

  constructor(private actions$: Actions, private usersService: UsersService) {}
}
