import { createReducer, on, Action } from '@ngrx/store';
import { openAlert, closeAlert } from './alert.actions';

export const featureKey = 'alert';

export interface State {
  isOpen: boolean;
  message: string;
  errors: { message: string; field: string }[];
}

export const initialState: Readonly<State> = {
  isOpen: false,
  message: null,
  errors: [],
};

export const alertReducer = createReducer(
  initialState,
  on(openAlert, (state, { message, errors }) => ({
    ...state,
    isOpen: true,
    message,
    errors,
  })),
  on(closeAlert, (state) => ({
    ...state,
    isOpen: false,
    message: null,
    errors: [],
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return alertReducer(state, action);
}
