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
import { tap, catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { openAlert, closeAlert } from 'app/shared/store/alert/alert.actions';

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
      tap((ev) => {
        if (ev instanceof HttpResponse) {
          if (ev.body && ev.body.message) {
            this.toasterService.success(ev.body.message, 'process succeeded.', {
              positionClass: 'toast-top-full-width',
            });
          }
        }
        return of(ev);
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (!err.error.message || err.status === 500) {
            this.openErrorToast(
              'An error occurred!',
              'Something went wrong, please try again later!'
            );
          }
          if (err.status === 422) {
            const alertMsg =
              err.error.errors?.length >= 1
                ? 'Please correct the following errors and try again:'
                : null;
            const errors = err.error.errors.map(
              (error: { [key: string]: string }) => ({
                message: Object.values(error)[0],
                field: Object.keys(error)[0],
              })
            );
            this.openErrorToast(
              'Validation faild!',
              'There are fields that require your attention!'
            );
            this.openAlert(alertMsg, errors);
          }
        }
        return of(err);
      })
    );
  }
}
