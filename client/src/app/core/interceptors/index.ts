import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './api-config.interceptor';
import { LoaderInterceptor } from './loader.interceptor';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
];
