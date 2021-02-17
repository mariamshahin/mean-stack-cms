import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { DashboardState, selectDashboard } from 'app/modules/dashboard/store';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private store: Store<DashboardState>) {}

  canActivate(): Observable<boolean> {
    const routerState = this.router.getCurrentNavigation().extras.state;
    return this.store.select(selectDashboard).pipe(
      map((state) => state?.login?.data),
      map((data) => {
        const isLoggedIn = data && data.user && data.token;
        if (isLoggedIn) {
          if (routerState) {
            if (routerState.redirect) {
              return true;
            }
          }
          this.router.navigate(['/admin']);
          return false;
        }

        return true;
      })
    );
  }
}
