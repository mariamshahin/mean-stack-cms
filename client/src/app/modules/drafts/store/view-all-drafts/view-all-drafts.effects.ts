import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { DraftsService } from '../../drafts.service';
import * as DraftsActions from './view-all-drafts.actions';

@Injectable()
export class DraftsEffects {
  viewDrafts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftsActions.viewDrafts),
      switchMap((action) =>
        this.draftsService.viewAllDrafts().pipe(
          map(({ data }) =>
            DraftsActions.draftsSuccess({
              drafts: data,
            })
          ),
          catchError((error) => of(DraftsActions.draftsFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(DraftsActions.draftsSuccess, DraftsActions.draftsFail)
            )
          )
        )
      )
    )
  );

  deleteDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftsActions.deleteDraft),
      switchMap(({ id }) =>
        this.draftsService.deleteDraft(id).pipe(
          map(({ message }) =>
            DraftsActions.deleteSuccess({ response: message })
          ),
          catchError((error) => of(DraftsActions.deleteFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(DraftsActions.deleteSuccess, DraftsActions.deleteFail)
            )
          )
        )
      )
    )
  );

  updateDrafts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftsActions.deleteSuccess),
      map(() => DraftsActions.viewDrafts())
    )
  );

  constructor(
    private actions$: Actions,
    private draftsService: DraftsService
  ) {}
}
