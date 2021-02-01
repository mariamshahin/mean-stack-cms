import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export enum RouterActionsTypes {
  RouterNavigate = '[Router] Navigate',
}

export const routerNavigate = createAction(
  RouterActionsTypes.RouterNavigate,
  props<{
    path: any[];
    queryParams?: object;
    extras?: NavigationExtras;
  }>()
);
