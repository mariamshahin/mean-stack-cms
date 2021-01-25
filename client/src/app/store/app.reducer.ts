import { ActionReducerMap } from '@ngrx/store';

import * as fromDashboard from '../modules/dashboard/store/dashboard.reducer';

export interface AppState {
  //dashboard: fromDashboard.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  //dashboard: fromDashboard.dashboardReducer,
};
