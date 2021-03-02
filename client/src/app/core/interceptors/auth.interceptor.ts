import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { AdminState, selectAdmin } from 'app/modules/admin/store';
import { logout } from 'app/modules/dashboard/store/login/login.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    @Inject('API_BASE_URL') private apiUrl: string,
    private store: Store<AdminState>,
    private actions$: Actions
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isApiUrl = req.url.startsWith(this.apiUrl);
    return this.store.select(selectAdmin).pipe(
      map((state) => state.auth.data),
      exhaustMap((data) => {
        const isLoggedIn = data && data.user && data.token;
        if (isLoggedIn && isApiUrl) {
          const modifiedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${data.token}`,
            },
          });
          return next.handle(modifiedReq);
        }
        return next.handle(req);
      }),
      takeUntil(this.actions$.pipe(ofType(logout)))
    );
  }
}
