import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, ParamMap } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public authSvc: AuthService,
    public router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authSvc.isEnabled(route.params)
      .then(
        (isEnabled: boolean) => {
          if (isEnabled) {
            return true;
          } else {
            this.router.navigate(['/']);
          }
        }
      );
  }
}
