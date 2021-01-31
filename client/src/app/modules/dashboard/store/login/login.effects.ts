// import { Injectable } from '@angular/core';
// import { Actions, ofType, createEffect } from '@ngrx/effects';
// import { EMPTY, Observable, of } from 'rxjs';
// import { catchError, exhaustMap, map } from 'rxjs/operators';
// import * as dashboardActions from '../store/dashboard.actions';
// //import { Credentials } from '../dashboard.model';
// import { DashboardService } from '../dashboard.service';
// import { Action } from 'rxjs/internal/scheduler/Action';

// @Injectable()
// export class DashboardEffects {
//   loadMovies$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(dashboardActions.register),
//       exhaustMap((action) =>
//         this.dashboardService.register(action).pipe(
//           map((res) => ({
//             type: '[Movies API] Movies Loaded Success',
//             payload: res,
//           })),
//           catchError(() => of({ type: '[Movies API] Movies Loaded Error' }))
//         )
//       )
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private dashboardService: DashboardService
//   ) {}
// }
