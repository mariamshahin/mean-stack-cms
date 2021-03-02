import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { DraftsService } from '../../drafts.service';
import * as DraftActions from './update-draft.actions';
import * as RouterActions from 'app/shared/store/router/router.actions';

@Injectable()
export class UpdateDraftEffects {
  updateDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftActions.updateDraft),
      switchMap((action) =>
        this.draftsService
          .updateDraft({ data: action.payload, id: action.id })
          .pipe(
            map(({ message }) =>
              DraftActions.updateSuccess({ response: message })
            ),
            catchError((error) => of(DraftActions.updateFail({ error }))),
            takeUntil(
              this.actions$.pipe(
                ofType(DraftActions.updateSuccess, DraftActions.updateFail)
              )
            )
          )
      )
    )
  );

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DraftActions.updateSuccess),
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
