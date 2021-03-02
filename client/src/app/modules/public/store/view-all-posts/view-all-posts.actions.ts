import { createAction, props } from '@ngrx/store';
import { Post } from 'app/shared/models/data.model';

export enum PostsActionsTypes {
  ViewPosts = '[Posts] View Posts',
  ViewPostsSuccess = '[Posts] View Posts Success',
  ViewPostsFail = '[Posts] View Posts Fail',
}

export const viewPosts = createAction(PostsActionsTypes.ViewPosts);

export const postsSuccess = createAction(
  PostsActionsTypes.ViewPostsSuccess,
  props<{
    posts: Post[];
  }>()
);

export const postsFail = createAction(
  PostsActionsTypes.ViewPostsFail,
  props<{
    error: string;
  }>()
);
