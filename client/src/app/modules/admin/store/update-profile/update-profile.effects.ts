import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import * as ProfileActions from './update-profile.actions';
import * as AuthActions from '../auth/auth.actions';

@Injectable()
export class ProfileEffects {
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      switchMap((action) =>
        this.adminService.updateProfile(action.payload).pipe(
          map(({ data, message }) =>
            ProfileActions.updateSuccess({
              data,
              response: message,
            })
          ),
          catchError((error) => of(ProfileActions.updateFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(ProfileActions.updateSuccess, ProfileActions.updateFail)
            )
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateSuccess),
      map(({ data }) =>
        AuthActions.updateUser({
          data,
        })
      )
    )
  );

  constructor(private actions$: Actions, private adminService: AdminService) {}
}
