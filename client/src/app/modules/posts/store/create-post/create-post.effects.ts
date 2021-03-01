import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, takeUntil } from 'rxjs/operators';
import { PostsService } from '../../posts.service';
import * as PostActions from './create-post.actions';
import * as RouterActions from 'app/shared/store/router/router.actions';

@Injectable()
export class CreatePostEffects {
  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createPost),
      switchMap((action) =>
        this.postsService.createPost(action.payload).pipe(
          map(({ message }) =>
            PostActions.createSuccess({ response: message })
          ),
          catchError((error) => of(PostActions.createFail({ error }))),
          takeUntil(
            this.actions$.pipe(
              ofType(PostActions.createSuccess, PostActions.createFail)
            )
          )
        )
      )
    )
  );

  navigate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.createSuccess),
      map(() =>
        RouterActions.routerNavigate({
          route: { path: ['/admin', 'posts'] },
        })
      )
    )
  );

  constructor(private actions$: Actions, private postsService: PostsService) {}
}
