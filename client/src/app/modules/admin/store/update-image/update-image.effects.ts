import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import * as ImageActions from './update-image.actions';
import * as LoginActions from 'app/modules/dashboard/store/login/login.actions';

@Injectable()
export class ImageEffects {
  updateImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.updateImage),
      switchMap((action) =>
        this.adminService.updateImage(action.payload).pipe(
          map(({ data }) =>
            LoginActions.updateUser({
              data,
            })
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.updateUser),
      map(() => ImageActions.updateSuccess({ response: 'user updated' }))
    )
  );

  constructor(private actions$: Actions, private adminService: AdminService) {}
}
