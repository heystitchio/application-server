import { Injectable }    from '@angular/core';
import { Router }        from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

import { AuthService }   from './auth.service';

declare var auth0: any;


@Injectable()
export class BrowserAuthService implements AuthService {

  private _auth = new auth0.WebAuth({
    domain: 'heystitchio.auth0.com',
    clientID: 'mSKfZ1UMwag0Vibr2DzbURdX6wgf5z72',
    callbackURL: 'http://localhost:3000/',
    responseType: 'token id_token'
  });

  constructor(
    private _cookies: CookieService,
    private _router: Router
  ) {}

  public login(email: String, password: String): void {
    this._auth.client.login({
      realm: 'Username-Password-Authentication',
      email,
      password
    }, (err, authResult) => {
      if (err) {
        alert('Error: ' + err.description);
        return;
      }
      if (authResult && authResult.idToken && authResult.accessToken) {
        this.setUserCookies(authResult.accessToken, authResult.idToken);
      }
    });
  }

  public loginWithGoogle(): void {
    this._auth.authorize({
      connection: 'google-oauth2',
    });
  }

  public logout(): void {
    this._cookies.remove('access_token');
    this._cookies.remove('id_token');
    this._router.navigate(['/login']);
  }

  public signup(email: String, password: String): void {
    this._auth.redirect.signupAndLogin({
      connection: 'Username-Password-Authentication',
      email,
      password,
    }, function(err) {
      if (err) {
        alert('Error: ' + err.description);
      }
    });
  }

  public isAuthenticated(): Boolean {
    if (this._cookies.get('access_token')) {
      return true;
    }
    return false;
  }

  public handleAuth(): void {
    this._auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setUserCookies(authResult.accessToken, authResult.idToken);
      } else if (authResult && authResult.error) {
        alert('Error: ' + authResult.error);
      }
    });
  }

  /*private setUserContext(user): void {
    this._error.setUserContext(user);
  }

  private removeUserContext(): void {
    this._error.removeUserContext();
  }*/

  private setUserCookies(accessToken, idToken): void {
    var date = new Date(),
        options = {}

    date.setTime(date.getTime()+(14*24*60*60*1000));
    options['expires'] = date;

    this._cookies.put('access_token', accessToken, options);
    this._cookies.put('id_token', idToken, options);
  }
  
}
