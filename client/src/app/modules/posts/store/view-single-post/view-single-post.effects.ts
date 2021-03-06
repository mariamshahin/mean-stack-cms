import { Injectable, OnDestroy } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { PostsService } from '../../posts.service';
import * as PostActions from './view-single-post.actions';

@Injectable()
export class PostEffects {
  viewSinglePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.viewSinglePost),
      switchMap((action) =>
        this.postsService.viewSinglePost(action.id).pipe(
          map(({ data }) =>
            PostActions.postSuccess({
              post: data,
            })
          ),
          catchError((error) => of(PostActions.postFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(PostActions.postSuccess, PostActions.postFail)
            )
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
