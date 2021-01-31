import { createReducer, on, Action } from '@ngrx/store';
import { openAlert, closeAlert } from './alert.actions';

export const featureKey = 'alert';

export interface State {
  isOpen: boolean;
  message: string;
}

export const initialState: Readonly<State> = {
  isOpen: false,
  message: null,
};

export const alertReducer = createReducer(
  initialState,
  on(openAlert, (state, { message }) => ({
    ...state,
    isOpen: true,
    dispatched: true,
    message,
  })),
  on(closeAlert, (state) => ({
    ...state,
    isOpen: false,
    message: null,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return alertReducer(state, action);
}
