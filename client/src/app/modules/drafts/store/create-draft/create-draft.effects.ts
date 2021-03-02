import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { DraftsService } from '../../drafts.service';
import * as DraftActions from './create-draft.actions';
import * as RouterActions from 'app/shared/store/router/router.actions';

@Injectable()
export class CreateDraftEffects {
  createDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftActions.createDraft),
      switchMap((action) =>
        this.draftsService.createDraft(action.payload).pipe(
          map(({ message }) =>
            DraftActions.createSuccess({ response: message })
          ),
          catchError((error) => of(DraftActions.createFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(DraftActions.createSuccess, DraftActions.createFail)
            )
          )
        )
      )
    )
  );

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftActions.createSuccess),
      map(() =>
        RouterActions.routerNavigate({
          route: { path: ['/admin', 'drafts'] },
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private draftsService: DraftsService
  ) {}
}
