import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { CookieService }   from 'angular2-cookie/services/cookies.service';

import { AuthService } from './auth.service';

declare var auth0: any;


@Injectable()
export class BrowserAuthService implements AuthService {

  private auth = new auth0.WebAuth({
    domain: 'heystitchio.auth0.com',
    clientID: 'mSKfZ1UMwag0Vibr2DzbURdX6wgf5z72',
    callbackURL: 'http://localhost:3000/',
    responseType: 'token id_token'
  });

  constructor(
    private _cookies: CookieService
  ) {}

  public login(username: string, password: string): void {
    this.auth.client.login({
      realm: 'Username-Password-Authentication',
      username,
      password
    }, (err, authResult) => {
      if (err) {
        alert('Error: ' + err.description);
        return;
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setUser(authResult);
      }
    });
  }

  public loginWithGoogle(): void {
    this.auth.authorize({
      connection: 'google-oauth2',
    });
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  public signup(email, password): void {
    this.auth.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, function(err) {
      if (err) {
        alert('Error: ' + err.description);
      }
    });
  }

  public isAuthenticated(): boolean {
    return tokenNotExpired();
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}
