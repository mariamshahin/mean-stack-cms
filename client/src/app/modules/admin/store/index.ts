import { InjectionToken } from '@angular/core';
import {
  combineReducers,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  ActionReducer,
} from '@ngrx/store';
import * as formAuth from './auth/auth.reducer';
import * as formProfile from './update-profile/update-profile.reducer';
import * as fromImage from './update-image/update-image.reducer';
import * as fromPassword from './change-password/change-password.reducer';
import { ProfileEffects } from './update-profile/update-profile.effects';
import { ImageEffects } from './update-image/update-image.effects';
import { PasswordEffects } from './change-password/change-password.effects';

export const featureKey = 'admin';

export interface AdminState {
  [formAuth.featureKey]: formAuth.State;
  [formProfile.featureKey]: formProfile.State;
  [fromImage.featureKey]: fromImage.State;
  [fromPassword.featureKey]: fromPassword.State;
}

export const reducers = combineReducers({
  [formAuth.featureKey]: formAuth.reducer,
  [formProfile.featureKey]: formProfile.reducer,
  [fromImage.featureKey]: fromImage.reducer,
  [fromPassword.featureKey]: fromPassword.reducer,
});

export const reducerToken = new InjectionToken<ActionReducerMap<AdminState>>(
  featureKey
);

export function getReducers(): ActionReducer<AdminState> {
  return reducers;
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers },
];

export const selectAdmin = createFeatureSelector<AdminState>(featureKey);

export const moduleState = createSelector(selectAdmin, (state) => state);

export const moduleEffects = [ProfileEffects, ImageEffects, PasswordEffects];
