import { InjectionToken } from '@angular/core';
import {
  combineReducers,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  ActionReducer,
} from '@ngrx/store';

import * as formDrafts from './view-all-drafts/view-all-drafts.reducer';
import * as formDraft from './view-single-draft/view-single-draft.reducer';
import * as formCreateDraft from './create-draft/create-draft.reducer';
import * as formUpdateDraft from './update-draft/update-draft.reducer';

import { DraftsEffects } from './view-all-drafts/view-all-drafts.effects';
import { DraftEffects } from './view-single-draft/view-single-draft.effects';
import { CreateDraftEffects } from './create-draft/create-draft.effects';
import { UpdateDraftEffects } from './update-draft/update-draft.effects';

export const featureKey = 'drafts';

export interface DraftsState {
  [formDrafts.featureKey]: formDrafts.State;
  [formDraft.featureKey]: formDraft.State;
  [formCreateDraft.featureKey]: formCreateDraft.State;
  [formUpdateDraft.featureKey]: formUpdateDraft.State;
}

export const reducers = combineReducers({
  [formDrafts.featureKey]: formDrafts.reducer,
  [formDraft.featureKey]: formDraft.reducer,
  [formCreateDraft.featureKey]: formCreateDraft.reducer,
  [formUpdateDraft.featureKey]: formUpdateDraft.reducer,
});

export const reducerToken = new InjectionToken<ActionReducerMap<DraftsState>>(
  featureKey
);

export function getReducers(): ActionReducer<DraftsState> {
  return reducers;
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers },
];

export const selectDrafts = createFeatureSelector<DraftsState>(featureKey);

export const moduleState = createSelector(selectDrafts, (state) => state);

export const moduleEffects = [
  DraftsEffects,
  DraftEffects,
  CreateDraftEffects,
  UpdateDraftEffects,
];
