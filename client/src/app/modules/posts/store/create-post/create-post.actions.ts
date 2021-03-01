import { createAction, props } from '@ngrx/store';
import { PostData } from '../../posts.model';

export enum PostActionsTypes {
  CreatePost = '[Posts] Create Post',
  CreatePostSuccess = '[Posts] Create Post Success',
  CreatePostFail = '[Posts] Create Post Fail',
}

export const createPost = createAction(
  PostActionsTypes.CreatePost,
  props<{
    payload: PostData;
  }>()
);

export const createSuccess = createAction(
  PostActionsTypes.CreatePostSuccess,
  props<{
    response: string;
  }>()
);

export const createFail = createAction(
  PostActionsTypes.CreatePostFail,
  props<{
    error: string;
  }>()
);
