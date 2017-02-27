import { Inject,
         Injectable }  from '@angular/core';

import { AuthService } from './';


export class NodeAuthService implements AuthService {

  constructor(
    @Inject('req') private _req: any
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

  public signupAndLogin(): void {
    throw new Error("Signup event cannot be called while doing server side rendering");
  }

  public updateUser(): void {
    throw new Error("Update User event cannot be called while doing server side rendering");
  }

  public isAuthenticated(): boolean {
    if (this._req.cookies['AUID']) {
      return true;
    } else {
      return false;
    }
  }

}
