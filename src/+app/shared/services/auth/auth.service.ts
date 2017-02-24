import { OpaqueToken } from '@angular/core';


export let AUTH_SERVICE = new OpaqueToken('auth.service');

export interface AuthService {

  login(username?, password?): void;
  loginWithGoogle(): void;
  logout(): void;
  signup(email?, password?): void;
  isAuthenticated(): boolean;
  handleAuth?(): void;

}
