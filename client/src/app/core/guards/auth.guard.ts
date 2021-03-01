import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AdminState, selectAdmin } from 'app/modules/admin/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router, private store: Store<AdminState>) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(selectAdmin).pipe(
      map((state) => state?.auth?.data),
      map((data) => {
        if (data) {
          if (route.data && route.data.roles) {
            if (route.data.roles.includes(data.user.role)) {
              return true;
            }
            this.router.navigate(['/admin']);
            return false;
          }
          return true;
        }

        this.router.navigate(['/dashboard', 'login']);
        return false;
      })
    );
  }
}
