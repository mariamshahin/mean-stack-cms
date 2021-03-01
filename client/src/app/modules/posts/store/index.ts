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
import * as formCreatePost from './create-post/create-post.reducer';
import * as formUpdatePost from './update-post/update-post.reducer';

import { PostsEffects } from './view-all-posts/view-all-posts.effects';
import { PostEffects } from './view-single-post/view-single-post.effects';
import { CreatePostEffects } from './create-post/create-post.effects';
import { UpdatePostEffects } from './update-post/update-post.effects';

export const featureKey = 'posts';

export interface PostsState {
  [formPosts.featureKey]: formPosts.State;
  [formPost.featureKey]: formPost.State;
  [formCreatePost.featureKey]: formCreatePost.State;
  [formUpdatePost.featureKey]: formUpdatePost.State;
}

export const reducers = combineReducers({
  [formPosts.featureKey]: formPosts.reducer,
  [formPost.featureKey]: formPost.reducer,
  [formCreatePost.featureKey]: formCreatePost.reducer,
  [formUpdatePost.featureKey]: formUpdatePost.reducer,
});

export const reducerToken = new InjectionToken<ActionReducerMap<PostsState>>(
  featureKey
);

export function getReducers(): ActionReducer<PostsState> {
  return reducers;
}

export const reducerProvider = [
  { provide: reducerToken, useFactory: getReducers },
];

export const selectPosts = createFeatureSelector<PostsState>(featureKey);

export const moduleState = createSelector(selectPosts, (state) => state);

export const moduleEffects = [
  PostsEffects,
  PostEffects,
  CreatePostEffects,
  UpdatePostEffects,
];
