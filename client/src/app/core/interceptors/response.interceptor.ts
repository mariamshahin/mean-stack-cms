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
import { openAlert, closeAlert } from 'app/shared/store/alert/alert.actions';
import { logout } from 'app/modules/dashboard/store/login/login.actions';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(public toasterService: ToastrService, private store: Store) {}

  openErrorToast(title: string, message: string): void {
    try {
      this.toasterService.error(message, title, {
        positionClass: 'toast-top-full-width',
      });
    } catch (e) {
      this.toasterService.error('An error occurred!', '', {
        positionClass: 'toast-top-full-width',
      });
    }
  }

  openAlert(
    message: string,
    errors: { message: string; field: string }[]
  ): void {
    this.store.dispatch(openAlert({ message, errors }));
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // cleanup alert message before submitting a new request
    this.store.dispatch(closeAlert());
    // show ui indicators
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.message) {
            this.toasterService.success(
              evt.body.message,
              'process succeeded.',
              {
                positionClass: 'toast-top-full-width',
              }
            );
          }
        }
        return of(evt);
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (
            err.status !== 401 &&
            (!err.error.message || err.status === 500)
          ) {
            this.openErrorToast(
              'An error occurred!',
              'Something went wrong, please try again later!'
            );
          }
          if (err.status === 422) {
            const alertMsg =
              err.error.errors?.length >= 1
                ? 'Please correct the following errors and try again:'
                : err.error.message
                ? 'Invalid fields!'
                : null;
            const errors = err.error.errors
              ? err.error.errors.map((error: { [key: string]: string }) => ({
                  message: Object.values(error)[0],
                  field: Object.keys(error)[0],
                }))
              : [{ message: err.error.message }];
            this.openErrorToast(
              'Validation faild!',
              'There are fields that require your attention!'
            );
            this.openAlert(alertMsg, errors);
          }
          if (err.status === 401) {
            this.store.dispatch(logout());
          }
          if (err.status === 404) {
            this.openErrorToast('process failed.', err.error.message);
            this.openAlert('process failed.', [
              { message: err.error.message, field: null },
            ]);
          }
        }
        return of(err);
      })
    );
  }
}
