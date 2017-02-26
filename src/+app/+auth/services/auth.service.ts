import { OpaqueToken } from '@angular/core';


export let AUTH_SERVICE = new OpaqueToken('auth.service');

export interface AuthService {

  login(email?: String, password?: String): any;
  loginWithGoogle(): void;
  logout(): any;
  signup(username?: String, email?: String, password?: String): any;
  updateUser(user?: Object): any;
  isAuthenticated(): Boolean;
  handleAuth?(): any;

}
