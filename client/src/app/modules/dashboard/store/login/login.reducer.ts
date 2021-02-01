// import { createReducer, on, Action } from '@ngrx/store';

// import { register } from './login.actions';

// export const featureKey = 'login';

// export interface State {
//   isOpen: boolean;
//   message: string;
// }

// export const initialState: Readonly<State> = {
//   isOpen: false,
//   message: null,
// };

// export const _reducer = createReducer(
//   initialState,
//   on(openAlert, (state, { message }) => ({
//     isOpen: true,
//     message,
//     ...state,
//   })),
//   on(closeAlert, (state) => ({
//     isOpen: false,
//     message: null,
//     ...state,
//   }))
// );

// export function reducer(state: State = initialState, action: Action) {
//   return _reducer(state, action);
// }





// import { createReducer, on, Action } from '@ngrx/store';

// import { register, login } from './dashboard.actions';
// import { AuthUser } from '../dashboard.model';

// //export const initialState: Readonly<AuthUser> = {};

// // export const registerReducer = createReducer(
// //   initialState,
// //   on(register, (state, { payload }) => ({
// //     ...state
// //   }))
// // );

// // export const loginReducer = createReducer(
// //   initialState,
// //   on(login, (state, { Book }) => [...Book])
// // );
