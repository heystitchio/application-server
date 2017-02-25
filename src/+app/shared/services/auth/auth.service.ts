import { OpaqueToken } from '@angular/core';


export let AUTH_SERVICE = new OpaqueToken('auth.service');

export interface AuthService {

  login(email?: String, password?: String): void;
  loginWithGoogle(): void;
  logout(): void;
  signup(email?: String, password?: String): void;
  isAuthenticated(): Boolean;
  handleAuth?(): void;

}
