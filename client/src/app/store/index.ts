import {
  ActionReducerMap,
  createSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  localStorageSync,
  rehydrateApplicationState,
} from 'ngrx-store-localstorage';
import { logout } from 'app/modules/dashboard/store/login/login.actions';

// --> Root reducer
export interface StoreRootState {
  router: RouterReducerState<any>;
}
export const reducers: ActionReducerMap<StoreRootState> = {
  router: routerReducer,
};

export const routerState = (state: StoreRootState) => state.router;

export const currentRouteState = createSelector(
  routerState,
  (state: RouterReducerState) => state.state
);

// --> Meta reducers

// sync local storage with dashboard access state
export function syncState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return localStorageSync({
      keys: [
        {
          admin: {
            encrypt: (state: string) => btoa(state),
            decrypt: (state: string) => atob(state),
          },
        },
      ],
      storageKeySerializer: (key: string) => `__${key}`,
      rehydrate: true,
    })(reducer)(state, action);
  };
}

// clear state when logout
export function clearState(
  reducer: ActionReducer<StoreRootState>
): ActionReducer<StoreRootState> {
  return (state, action) => {
    if (action.type === logout.type) {
      state = { router: state.router };
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [syncState, clearState];
