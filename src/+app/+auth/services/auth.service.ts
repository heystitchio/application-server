import { OpaqueToken } from '@angular/core';


export let AUTH_SERVICE = new OpaqueToken('auth.service');

export interface AuthService {

  login(email?: String, password?: String): any;
  loginWithGoogle(): void;
  logout(): any;
  signupAndLogin(username?: String, password?: String): any;
  isAuthenticated(): Boolean;
  initAuth?(): any;

}
