import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { openAlert } from 'app/shared/store/alert/alert.actions';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService, private store: Store) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) {
            this.toasterService.success(
              evt.body.success.message,
              evt.body.success.title,
              { positionClass: 'toast-top-full-width' }
            );
          }
        }
      }),
      catchError((err: any) => {
        const api = req.url.replace(/\/$/, '').split('/').splice(-1)[0];
        const alert = ['register', 'login'];
        const message =
          !err.error.message || err.status === 500
            ? 'Something went wrong, please try again later!'
            : err.error.message;
        if (alert.includes(api)) {
          this.store.dispatch(openAlert({ message }));
        } else {
          if (err instanceof HttpErrorResponse) {
            try {
              this.toasterService.error(message, 'An error occurred!', {
                positionClass: 'toast-top-full-width',
              });
            } catch (e) {
              this.toasterService.error('An error occurred!', '', {
                positionClass: 'toast-top-full-width',
              });
            }
          }
        }
        return of(err);
      })
    );
  }
}
