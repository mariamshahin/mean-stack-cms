import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { PostsService } from '../../posts.service';
import * as PostsActions from './view-all-posts.actions';

@Injectable()
export class PostsEffects {
  viewPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.viewPosts),
      switchMap((action) =>
        this.postsService.viewAllPosts().pipe(
          map(({ data }) =>
            PostsActions.postsSuccess({
              posts: data,
            })
          ),
          catchError((error) => of(PostsActions.postsFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(PostsActions.postsSuccess, PostsActions.postsFail)
            )
          )
        )
      )
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deletePost),
      switchMap(({ id }) =>
        this.postsService.deletePost(id).pipe(
          map(({ message }) =>
            PostsActions.deleteSuccess({ response: message })
          ),
          catchError((error) => of(PostsActions.deleteFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(PostsActions.deleteSuccess, PostsActions.deleteFail)
            )
          )
        )
      )
    )
  );

  updatePosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deleteSuccess),
      map(() => PostsActions.viewPosts())
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
