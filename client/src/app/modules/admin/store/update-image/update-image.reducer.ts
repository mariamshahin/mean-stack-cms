import { createReducer, on, Action } from '@ngrx/store';
import { updateSuccess, updateFail } from './update-image.actions';

export const featureKey = 'updateImage';

export interface State {
  response: string;
  error: string;
}

export const initialState: Readonly<State> = {
  response: null,
  error: null,
};

export const ImageReducer = createReducer(
  initialState,
  on(updateSuccess, (state, { response }) => ({
    ...state,
    response,
  })),
  on(updateFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return ImageReducer(state, action);
}
