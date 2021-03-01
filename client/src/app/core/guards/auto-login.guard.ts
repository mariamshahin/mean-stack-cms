import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AdminState, selectAdmin } from 'app/modules/admin/store';

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AdminState>) {}

  canActivate(): Observable<boolean> {
    const routerState = this.router.getCurrentNavigation().extras.state;
    return this.store.select(selectAdmin).pipe(
      map((state) => state?.auth?.data),
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
