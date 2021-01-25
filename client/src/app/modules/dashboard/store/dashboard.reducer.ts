import { createReducer, on, Action } from '@ngrx/store';

import { register, login } from './dashboard.actions';
import { Login } from '../dashboard.model';

export const initialState: Readonly<Login> = {};

// export const registerReducer = createReducer(
//   initialState,
//   on(register, (state, { payload }) => ({
//     ...state
//   }))
// );

// export const loginReducer = createReducer(
//   initialState,
//   on(login, (state, { Book }) => [...Book])
// );
