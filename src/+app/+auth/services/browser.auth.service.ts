import { Injectable }    from '@angular/core';
import { Router }        from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import gql from 'graphql-tag';

import { AuthService }   from './';
import { ApiService }    from '../../shared/services/api/api.service';

declare var auth0: any;


@Injectable()
export class BrowserAuthService implements AuthService {

  private _auth = new auth0.WebAuth({
    domain: 'heystitchio.auth0.com',
    clientID: 'mSKfZ1UMwag0Vibr2DzbURdX6wgf5z72',
    callbackURL: 'http://localhost:3000',
    responseType: 'token'
  });

  constructor(
    private _cookies: CookieService,
    private _router: Router,
    private _api: ApiService
  ) {}

  public login(username: String, password: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this._auth.client.login({
        realm: 'Username-Password-Authentication',
        username,
        password
      }, (err, authResult) => {
        if (err) {
          reject(Error(err.description))
        }
        if (authResult && authResult.accessToken) {
          this.setAccessCookie(authResult.accessToken)
            .then(accessToken => this.getUserInfo(accessToken))
            .then(user => resolve(user));
        }
      });
    });
  }

  public loginWithGoogle(): void {
    this._auth.authorize({
      connection: 'google-oauth2',
    });
  }

  public logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._cookies.remove('AUID');
      }
      catch(err) {
        reject(Error(err));
      }
      resolve(true);
    });
  }

  public signup(username: String, email: String, password: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this._auth.redirect.signupAndLogin({
        connection: 'Username-Password-Authentication',
        email,
        username,
        password,
      }, function(err) {
        if (err) {
          reject(Error(err.description));
        }
        resolve({username, email, password});
      });
    });
  }

  public updateUser(user: Object): Promise<any> {
    return newPromise((resolve, reject) => {
      if (user) {
        resolve(user);
      } else {
        reject(Error('An error occured.'));
      }
    });
  }

  public isAuthenticated(): Boolean {
    if (this._cookies.get('AUID')) {
      return true;
    }
    return false;
  }

  public handleAuth(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._auth.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken) {
          try {
            window.location.hash = '';
            this.setAccessCookie(authResult.accessToken);
          }
          catch(err) {
            reject(Error(err));
          }
          this.getUserInfo(authResult.accessToken)
            .then(user => resolve(user));
        } else if (authResult && authResult.error) {
          reject(Error(authResult.error));
        }
      });
    });
  }

  /*private setUserContext(user): void {
    this._error.setUserContext(user);
  }

  private removeUserContext(): void {
    this._error.removeUserContext();
  }*/

  private setAccessCookie(accessToken): Promise<any> {
    return new Promise((resolve, reject) => {
      var date = new Date(),
          options = {}

      date.setTime(date.getTime()+(14*24*60*60*1000));
      options['expires'] = date;

      try {
        this._cookies.put('AUID', accessToken, options);
      }
      catch (err) {
        reject(Error(err));
      }
      resolve(accessToken);
    });
  }

  private getUserInfo(accessToken): Promise<any> {
    return new Promise((resolve, reject) => {
      this._auth.client.userInfo(accessToken, function(err, user) {
        if (err) {
          reject(Error(err));
        }
        if (user) {
          resolve(user);
        }
      });
    });
  }
  
}
