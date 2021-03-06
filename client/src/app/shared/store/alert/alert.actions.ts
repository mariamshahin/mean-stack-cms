import { createAction, props } from '@ngrx/store';

export enum AlertActionsTypes {
  OpenAlert = '[Alert] Open alert',
  CloseAlert = '[Alert] Close alert',
}

export const openAlert = createAction(
  AlertActionsTypes.OpenAlert,
  props<{
    message: string;
    errors: { message: string; field: string }[];
  }>()
);

export const closeAlert = createAction(AlertActionsTypes.CloseAlert);
