import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { AdminService } from '../../admin.service';
import * as PasswordActions from './change-password.actions';

@Injectable()
export class PasswordEffects {
  changePassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PasswordActions.changePassword),
      switchMap((action) =>
        this.adminService
          .changePassword(action.payload)
          .pipe(
            map(({ message }) =>
              PasswordActions.changeSuccess({ response: message })
            )
          )
      )
    )
  );

  constructor(private actions$: Actions, private adminService: AdminService) {}
}
