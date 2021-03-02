import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AdminState, selectAdmin } from 'app/modules/admin/store';

@Injectable({ providedIn: 'root' })
export class AutoLoginGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AdminState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectAdmin).pipe(
      map((state) => state.auth.data),
      map((data) => {
        const isLoggedIn = data && data.user && data.token;
        if (isLoggedIn) {
          this.router.navigate(['/admin']);
          return false;
        }
        return true;
      })
    );
  }
}
