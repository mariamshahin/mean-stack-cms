import { createAction, props } from '@ngrx/store';
import { Route } from '../../models/data.model';

export enum RouterActionsTypes {
  RouterNavigate = '[Router] Navigate',
}

export const routerNavigate = createAction(
  RouterActionsTypes.RouterNavigate,
  props<{
    route: Route;
  }>()
);
