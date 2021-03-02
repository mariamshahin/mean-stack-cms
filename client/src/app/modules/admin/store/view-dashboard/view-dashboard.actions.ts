import { createAction, props } from '@ngrx/store';

export enum DashboardActionsTypes {
  ViewDashboard = '[Dashboard] View Dashboard',
  ViewDashboardSuccess = '[Dashboard] View Dashboard Success',
  ViewDashboardFail = '[Dashboard] View Dashboard Fail',
}

export const viewDashboard = createAction(DashboardActionsTypes.ViewDashboard);

export const dashboardSuccess = createAction(
  DashboardActionsTypes.ViewDashboardSuccess,
  props<{
    data: any;
  }>()
);

export const dashboardFail = createAction(
  DashboardActionsTypes.ViewDashboardFail,
  props<{
    error: string;
  }>()
);
