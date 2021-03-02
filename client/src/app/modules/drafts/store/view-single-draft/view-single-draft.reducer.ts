import { createReducer, on, Action } from '@ngrx/store';
import { draftSuccess, draftFail } from './view-single-draft.actions';
import { Post } from 'app/shared/models/data.model';

export const featureKey = 'viewSingleDraft';

export interface State {
  draft: Post;
  error: string;
}

export const initialState: Readonly<State> = {
  draft: null,
  error: null,
};

export const draftReducer = createReducer(
  initialState,
  on(draftSuccess, (state, { draft }) => ({
    ...state,
    draft,
  })),
  on(draftFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return draftReducer(state, action);
}
