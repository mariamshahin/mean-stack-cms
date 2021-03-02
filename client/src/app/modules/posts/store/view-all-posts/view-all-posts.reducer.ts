import { createReducer, on, Action } from '@ngrx/store';
import { postsSuccess, postsFail } from './view-all-posts.actions';
import { Post } from 'app/shared/models/data.model';

export const featureKey = 'viewAllPosts';

export interface State {
  posts: Post[];
  error: string;
}

export const initialState: Readonly<State> = {
  posts: null,
  error: null,
};

export const postsReducer = createReducer(
  initialState,
  on(postsSuccess, (state, { posts }) => ({
    ...state,
    posts,
  })),
  on(postsFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return postsReducer(state, action);
}
