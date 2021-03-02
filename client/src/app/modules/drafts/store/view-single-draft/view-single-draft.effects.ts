import { Injectable, OnDestroy } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { DraftsService } from '../../drafts.service';
import * as DraftActions from './view-single-draft.actions';

@Injectable()
export class DraftEffects {
  viewSingleDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftActions.viewSingleDraft),
      switchMap((action) =>
        this.draftsService.viewSingleDraft(action.id).pipe(
          map(({ data }) =>
            DraftActions.draftSuccess({
              draft: data,
            })
          ),
          catchError((error) => of(DraftActions.draftFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(DraftActions.draftSuccess, DraftActions.draftFail)
            )
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private draftsService: DraftsService
  ) {}
}
