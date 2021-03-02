import { createAction, props } from '@ngrx/store';
import { Post } from 'app/shared/models/data.model';

export enum PostActionsTypes {
  ViewSinglePost = '[Posts] View Single Post',
  ViewSinglePostSuccess = '[Posts] View Single Post Success',
  ViewSinglePostFail = '[Posts] View Single Post Fail',
}

export const viewSinglePost = createAction(
  PostActionsTypes.ViewSinglePost,
  props<{
    id: number;
  }>()
);

export const postSuccess = createAction(
  PostActionsTypes.ViewSinglePostSuccess,
  props<{
    post: Post;
  }>()
);

export const postFail = createAction(
  PostActionsTypes.ViewSinglePostFail,
  props<{
    error: string;
  }>()
);
