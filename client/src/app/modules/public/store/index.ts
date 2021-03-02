import { InjectionToken } from '@angular/core';
import {
  combineReducers,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  ActionReducer,
} from '@ngrx/store';

import * as formPosts from './view-all-posts/view-all-posts.reducer';
import * as formPost from './view-single-post/view-single-post.reducer';

import { PostsEffects } from './view-all-posts/view-all-posts.effects';
import { PostEffects } from './view-single-post/view-single-post.effects';

export const featureKey = 'public';

export interface PublicState {
  [formPosts.featureKey]: formPosts.State;
  [formPost.featureKey]: formPost.State;
}

export const reducers = combineReducers({
  [formPosts.featureKey]: formPosts.reducer,
  [formPost.featureKey]: formPost.reducer,
});

export const reducerToken = new InjectionToken<ActionReducerMap<PublicState>>(
  featureKey
);

export function getReducers(): ActionReducer<PublicState> {
  return reducers;
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers },
];

export const selectPublic = createFeatureSelector<PublicState>(featureKey);

export const moduleState = createSelector(selectPublic, (state) => state);

export const moduleEffects = [PostsEffects, PostEffects];
