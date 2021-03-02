import { createReducer, on, Action } from '@ngrx/store';
import { draftsSuccess, draftsFail } from './view-all-drafts.actions';
import { Post } from 'app/shared/models/data.model';

export const featureKey = 'viewAllDrafts';

export interface State {
  drafts: Post[];
  error: string;
}

export const initialState: Readonly<State> = {
  drafts: null,
  error: null,
};

export const draftsReducer = createReducer(
  initialState,
  on(draftsSuccess, (state, { drafts }) => ({
    ...state,
    drafts,
  })),
  on(draftsFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return draftsReducer(state, action);
}
