import { createReducer, on, Action } from '@ngrx/store';
import { dashboardSuccess, dashboardFail } from './view-dashboard.actions';

export const featureKey = 'viewDashboard';

export interface State {
  data: any;
  error: string;
}

export const initialState: Readonly<State> = {
  data: null,
  error: null,
};

export const dashboardReducer = createReducer(
  initialState,
  on(dashboardSuccess, (state, { data }) => ({
    ...state,
    data,
  })),
  on(dashboardFail, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(
  state: State = initialState,
  action: Action
): Readonly<State> {
  return dashboardReducer(state, action);
}
