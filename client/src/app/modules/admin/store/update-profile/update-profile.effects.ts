import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import * as ProfileActions from './update-profile.actions';
import * as LoginActions from 'app/modules/dashboard/store/login/login.actions';

@Injectable()
export class ProfileEffects {
  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      switchMap((action) =>
        this.adminService.updateProfile(action.payload).pipe(
          map(({ data }) =>
            LoginActions.updateUser({
              data,
            })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private adminService: AdminService) {}
}
