import { OpaqueToken } from '@angular/core';


export let AuthService = new OpaqueToken('auth.service');

export interface AuthService {

  signupAndLogin(username?: String, password?: String): any;
  login(email?: String, password?: String): any;
  logout(): any;
  initAuth?(): any;

}
