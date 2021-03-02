import { createReducer, on, Action } from '@ngrx/store';
import { createSuccess, createFail } from './create-draft.actions';

export const featureKey = 'createDraft';

export interface State {
  response: string;
  error: string;
}

export const initialState: Readonly<State> = {
  response: null,
  error: null,
};

export const createDraftReducer = createReducer(
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
  return createDraftReducer(state, action);
}
