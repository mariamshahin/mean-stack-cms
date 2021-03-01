import { createAction, props } from '@ngrx/store';
import { PostData } from '../../posts.model';

export enum PostActionsTypes {
  UpdatePost = '[Posts] Update Post',
  UpdatePostSuccess = '[Posts] Update Post Success',
  UpdatePostFail = '[Posts] Update Post Fail',
}

export const updatePost = createAction(
  PostActionsTypes.UpdatePost,
  props<{
    payload: PostData;
    id: number;
  }>()
);

export const updateSuccess = createAction(
  PostActionsTypes.UpdatePostSuccess,
  props<{
    response: string;
  }>()
);

export const updateFail = createAction(
  PostActionsTypes.UpdatePostSuccess,
  props<{
    error: string;
  }>()
);
