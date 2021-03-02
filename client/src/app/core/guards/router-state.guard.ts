import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterStateGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const routerState = this.router.getCurrentNavigation().extras.state;
    if (routerState && routerState.redirect) {
      return true;
    }
    this.router.navigate(['/admin']);
    return false;
  }
}
