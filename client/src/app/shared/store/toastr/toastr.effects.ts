import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as ToastActions from './toastr.actions';
import { of } from 'rxjs';

@Injectable()
export class ToastrEffects {
  toast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ToastActions.showToast),
        mergeMap(({ title, message }) =>
          of(this.toastr.success(message, title))
        )
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private toastr: ToastrService) {}
}
