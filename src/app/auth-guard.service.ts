import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(): boolean {

    if (!this.auth.isTokenValid()) {
      this.router.navigate(['login']);
      console.log("navigte to login")
      return false;
    }
    console.log("not")
    return true;
  }

}
