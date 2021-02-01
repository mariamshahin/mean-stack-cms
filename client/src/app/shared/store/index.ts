import { InjectionToken } from '@angular/core';
import {
  combineReducers,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromAlert from './alert/alert.reducer';
import { RouterEffects } from './router/router.effects';

export const featureKey = 'shared';

export interface SharedState {
  [fromAlert.featureKey]: fromAlert.State;
}

export const reducers = combineReducers({
  [fromAlert.featureKey]: fromAlert.reducer,
});

export const reducerToken = new InjectionToken<ActionReducerMap<SharedState>>(
  featureKey
);

export function getReducers() {
  return reducers;
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers },
];

export const selectSharedModule = createFeatureSelector<SharedState>(
  featureKey
);

export const selectSharedState = createSelector(selectSharedModule, (state) => state);

export const moduleEffects = [RouterEffects];
