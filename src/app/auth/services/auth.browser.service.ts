import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

import { Injectable }                              from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import { CookieService }                           from 'angular2-cookie/services/cookies.service';
import gql                                         from 'graphql-tag';

import { AuthService }                             from './';
import { ApiService }                              from '../../shared/services/api';

const createUserMutation = gql`
  mutation createUser($idToken: String!, $username: String!, $email: String!, $emailConfirm: Boolean!, $avatarUrl: String!) {
    createUser(authProvider: {auth0: {idToken: $idToken}}, username: $username, email: $email, emailConfirm: $emailConfirm, avatarUrl: $avatarUrl) {
      id
      username
      email
      emailConfirm
      avatarUrl
    }
  }
`

const authUserQuery = gql`
  query User($idToken: String!) {
    User(auth0UserId: $idToken) {
      id
      avatarUrl
      email
      emailConfirm
      name
      notifications {
        id
      }
      chats {
        id
      }
      followedProjects {
        id
      }
    }
  }
`


@Injectable()
export class BrowserAuthService implements AuthService {

  private baseUrl = 'https://heystitchio.auth0.com';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers })

  constructor(
    private _cookies: CookieService,
    private _api: ApiService,
    private _http: Http
  ) {}

  public signupAndLogin(email: String, password: String): Observable<any> {
    return this.signupUser(email, password)
      .flatMap(data => this.authenticateUser(data['email'], password))
      .flatMap(data => this.getUserInfo(data['id_token']))
      .flatMap(data => this.createUserInDatabase(data['user']))
      .catch((err:any) => Observable.throw(`browser.auth.service.ts[signupAndLogin()] => ${err}` || 'browser.auth.service.ts[signupAndLogin()] => An unknown error occurred.'));
  }

  public login(email: String, password: String): Observable<any> {
    var error = null;

    return this.authenticateUser(email, password)
      .flatMap(data => this.getUserInfo(data['id_token']))
      .flatMap(data => this.getUserFromDatabase(data['token'], data['user']['user_id']))
      .catch((err: any) => Observable.throw(`browser.auth.service.ts[login()] => ${err}` || 'browser.auth.service.ts[login()] => An unknown error occurred.'));
  }

  public logout(): void {
    this.removeAccessCookies();
  }

  public initAuth(): Observable<Object> {
    var token = this._cookies.get('USID');

    console.log(token);

    if (token != null) {
      return this.getUserInfo(token)
        .flatMap(data => this.getUserFromDatabase(data['token'], data['user']['user_id']))
        .catch((error: any) => Observable.throw(`browser.auth.service.ts[initAuth()] => ${error}` || 'browser.auth.service.ts[initAuth()] => An unknown error occurred.'));
    }
  }

  private signupUser(email: String, password: String): Observable<Response> {
    var payload = {
      "client_id": "mSKfZ1UMwag0Vibr2DzbURdX6wgf5z72",
      "email": email,
      "password": password,
      "connection": "Username-Password-Authentication"
    };
    return this._http.post(`${this.baseUrl}/dbconnections/signup`, payload, this.options)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(`browser.auth.service.ts[signupUser()] => ${error}` || 'browser.auth.service.ts[signupUser()] => An unknown error occurred.'));
  }

  private authenticateUser(email: String, password: String): Observable<Response> {
    var payload = {
      "client_id": "mSKfZ1UMwag0Vibr2DzbURdX6wgf5z72",
      "connection": "Username-Password-Authentication",
      "grant_type": "password",
      "username": email,
      "password": password,
      "scope": "openid"
    };
    return this._http.post(`${this.baseUrl}/oauth/ro`, payload, this.options)
      .map(response => response.json())
      .flatMap(response => this.setAccessCookies(response))
      .catch((error: any) => Observable.throw(`browser.auth.service.ts[authenticateUser()] => ${error}` || 'browser.auth.service.ts[authenticateUser()] => An unknown error occurred.'));
  }

  private getUserInfo(token: String): Observable<Response> {
    var payload = {
            "id_token": token
          };
    return this._http.post(`${this.baseUrl}/tokeninfo`, payload, this.options)
      .map(response => { return { user: response.json(), token: token }})
      .catch((error: any) => Observable.throw(`browser.auth.service.ts[getUserInfo()] => ${error}` || 'browser.auth.service.ts[getUserInfo()] => An unknown error occurred.'));
  }

  private createUserInDatabase(user: Object): Observable<Object> {
    var token = this._cookies.get('USID'),
        query = {
          mutation: createUserMutation,
          variables: {
            "idToken": token,
            "username": user['name'],
            "email": user['email'],
            "emailConfirm": user['email_verified'],
            "avatarUrl": `https://api.adorable.io/avatars/100/${token}.png`
          }
        };
    return this._api.mutate(query)
      .map(response => { return { error: null, token: token, user: response.data.createUser }})
      .catch((error: any) => Observable.throw(`browser.auth.service.ts[createUserInDatabase()] => ${error}` || 'browser.auth.service.ts[createUserInDatabase()] => An unknown error occurred.'));
  }

  private getUserFromDatabase(token: String, authId: String): Observable<Object> {
    var query = {
          query: authUserQuery,
          variables: {
            "idToken": authId
          }
        };
    return this._api.query(query)
      .map(response => { return { error: null, token: token, user: response.data.User }})
      .catch((error: any) => Observable.throw(`browser.auth.service.ts[getUserFromDatabase()] => ${error}` || 'browser.auth.service.ts[getUserFromDatabase()] => An unknown error occurred.'));
  }

  private setAccessCookies(response: String): Observable<String> {
    try {
      this._cookies.put('AUID', response['access_token']);
      this._cookies.put('USID', response['id_token']);
    }
    catch (error) {
      return Observable.throw(error => `browser.auth.service.ts[setAccessCookies()] => ${error}` || 'browser.auth.service.ts[setAccessCookies()] => An unknown error occurred.');
    }
    return Observable.of(response);
  }

  private removeAccessCookies(): void {
    try {
      this._cookies.remove('AUID');
      this._cookies.remove('USID');
    }
    catch (error) {
      throw (Error(`browser.auth.service.ts[removeAccessCookies()] => ${error}` || 'browser.auth.service.ts[removeAccessCookies()] => An unknown error occurred.'));
    }
  }
  
}
