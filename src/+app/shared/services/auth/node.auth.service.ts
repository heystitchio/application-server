import { Inject,
         Injectable }  from '@angular/core';

import { AuthService } from './auth.service';


export class NodeAuthService implements AuthService {

  constructor(
    private _req: any
  ) {}

  public login(): void {
    throw new Error("Login event cannot be called while doing server side rendering");
  }

  public loginWithGoogle(): void {
    throw new Error("Login event cannot be called while doing server side rendering");
  }

  public logout(): void {
    throw new Error("Logout event cannot be called while doing server side rendering");
  }

  public signup(): void {
    throw new Error("Signup event cannot be called while doing server side rendering");
  }

  public isAuthenticated(): boolean {
    if (this._req.authenticationId) {
      return true;
    } else {
      return false;
    }
  }

}
