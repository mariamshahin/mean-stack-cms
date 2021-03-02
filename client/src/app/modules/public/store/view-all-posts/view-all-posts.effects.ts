import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { PublicService } from '../../public.service';
import * as PostsActions from './view-all-posts.actions';

@Injectable()
export class PostsEffects {
  viewPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.viewPosts),
      switchMap((action) =>
        this.publicService.viewAllPosts().pipe(
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

  constructor(
    private actions$: Actions,
    private publicService: PublicService
  ) {}
}
