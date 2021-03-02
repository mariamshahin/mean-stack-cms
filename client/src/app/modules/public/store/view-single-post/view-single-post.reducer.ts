import { createReducer, on, Action } from '@ngrx/store';
import { postSuccess, postFail } from './view-single-post.actions';
import { Post } from 'app/shared/models/data.model';

export const featureKey = 'viewSinglePost';

export interface State {
  post: Post;
  error: string;
}

export const initialState: Readonly<State> = {
  post: null,
  error: null,
};

export const postReducer = createReducer(
  initialState,
  on(postSuccess, (state, { post }) => ({
    ...state,
    post,
  })),
  on(postFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return postReducer(state, action);
}
