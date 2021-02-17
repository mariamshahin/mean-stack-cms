import { Injectable } from '@angular/core';
import {
  Router,
  CanActivateChild,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DashboardState, selectDashboard } from 'app/modules/dashboard/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  constructor(private router: Router, private store: Store<DashboardState>) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(selectDashboard).pipe(
      map((state) => state?.login?.data),
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
