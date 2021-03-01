import { createReducer, on, Action } from '@ngrx/store';
import { createSuccess, createFail } from './create-post.actions';

export const featureKey = 'createPost';

export interface State {
  response: string;
  error: string;
}

export const initialState: Readonly<State> = {
  response: null,
  error: null,
};

export const createPostReducer = createReducer(
  initialState,
  on(createSuccess, (state, { response }) => ({
    ...state,
    response,
  })),
  on(createFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return createPostReducer(state, action);
}
