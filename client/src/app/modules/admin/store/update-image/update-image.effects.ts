import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import * as ImageActions from './update-image.actions';
import * as AuthActions from '../auth/auth.actions';

@Injectable()
export class ImageEffects {
  updateImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.updateImage),
      switchMap((action) =>
        this.adminService.updateImage(action.payload).pipe(
          map(({ data, message }) =>
            ImageActions.updateSuccess({ data, response: message })
          ),
          catchError((error) => of(ImageActions.updateFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(ImageActions.updateSuccess, ImageActions.updateFail)
            )
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.updateSuccess),
      map(({ data }) =>
        AuthActions.updateUser({
          data,
        })
      )
    )
  );

  constructor(private actions$: Actions, private adminService: AdminService) {}
}
