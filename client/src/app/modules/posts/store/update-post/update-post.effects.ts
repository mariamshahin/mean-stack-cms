import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { PostsService } from '../../posts.service';
import * as PostActions from './update-post.actions';
import * as RouterActions from 'app/shared/store/router/router.actions';

@Injectable()
export class UpdatePostEffects {
  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updatePost),
      switchMap((action) =>
        this.postsService
          .updatePost({ data: action.payload, id: action.id })
          .pipe(
            map(({ message }) =>
              PostActions.updateSuccess({ response: message })
            ),
            catchError((error) => of(PostActions.updateFail({ error }))),
            takeUntil(
              this.actions$.pipe(
                ofType(PostActions.updateSuccess, PostActions.updateFail)
              )
            )
          )
      )
    )
  );

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updateSuccess),
      map(() =>
        RouterActions.routerNavigate({
          route: { path: ['/admin', 'posts'] },
        })
      )
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
