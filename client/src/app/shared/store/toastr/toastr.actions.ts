import { createAction, props } from '@ngrx/store';

export enum ToastActionsTypes {
  ShowToast = '[Toast] Show toast',
}

export const showToast = createAction(
  ToastActionsTypes.ShowToast,
  props<{
    title: string;
    message: string;
  }>()
);
