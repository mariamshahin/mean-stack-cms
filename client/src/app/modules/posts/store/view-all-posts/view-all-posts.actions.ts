import { createAction, props } from '@ngrx/store';
import { Post } from 'app/shared/models/data.model';

export enum PostsActionsTypes {
  ViewPosts = '[Posts] View Posts',
  ViewPostsSuccess = '[Posts] View Posts Success',
  ViewPostsFail = '[Posts] View Posts Fail',
  DeletePost = '[Posts] Delete Post',
  DeletePostSuccess = '[Posts] Delete Post Success',
  DeletePostFail = '[Posts] Delete Post Fail',
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

export const deletePost = createAction(
  PostsActionsTypes.DeletePost,
  props<{
    id: number;
  }>()
);

export const deleteSuccess = createAction(
  PostsActionsTypes.DeletePostSuccess,
  props<{
    response: string;
  }>()
);

export const deleteFail = createAction(
  PostsActionsTypes.DeletePostFail,
  props<{
    error: string;
  }>()
);
