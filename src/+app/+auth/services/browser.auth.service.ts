import { Injectable }     from '@angular/core';
import { Http,
         Headers,
         RequestOptions,
         Response }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { CookieService }  from 'angular2-cookie/services/cookies.service';
import gql                from 'graphql-tag';

import { AuthService }    from './';
import { ApiService }     from '../../shared/services/api';

const createUserMutation = gql`
  mutation createUser($idToken: String!, $username: String!, $email: String!, $avatarUrl: String!) {
    createUser(authProvider: {auth0: {idToken: $idToken}}, username: $username, email: $email, avatarUrl: $avatarUrl) {
      id
      username
      email
      avatarUrl
    }
  }
`

const authUserQuery = gql`
  query ($idToken: String!) {
    user {
      id
      avatarUrl
      chats
      email
      emailConfirm
      followedProjects
      name
      notifications
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
      .flatMap(data => this.createUserInDatabase(data))
      .catch((error:any) => Observable.throw(`browser.auth.service.ts[signupAndLogin()] => ${error}` || 'browser.auth.service.ts[signupAndLogin()] => An unknown error occurred.'));
  }

  public login(email: String, password: String): Observable<any> {
    return this.authenticateUser(email, password)
      .flatMap(data => this.getUserFromDatabase(data['id_token']))
      .catch((error: any) => Observable.throw(`browser.auth.service.ts[login()] => ${error}` || 'browser.auth.service.ts[login()] => An unknown error occurred.'));
  }

  public logout(): void {
    this.removeAccessCookies();
  }

  public isAuthenticated(): Boolean {
    return true || false;
  }

  public initAuth() {
    return true;
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

  private getUserInfo(token): Observable<Response> {
    var payload = {
            "id_token": token
          };
    return this._http.post(`${this.baseUrl}/tokeninfo`, payload, this.options)
      .map(response => response.json())
      .catch((error: any) => Observable.throw(`browser.auth.service.ts[getUserInfo()] => ${error}` || 'browser.auth.service.ts[getUserInfo()] => An unknown error occurred.'));
  }

  private createUserInDatabase(user): Observable<Object> {
    var idToken = this._cookies.get('USID'),
        query = {
          mutation: createUserMutation,
          variables: {
            "idToken": idToken,
            "username": user.name,
            "email": user.email,
            "avatarUrl": `https://api.adorable.io/avatars/100/${idToken}.png`
          }
        },
        response = {
          error: null,
          token: null,
          current: null
        };
        response.current = this._api.mutate(query)
          .map(response => response.json())
          .catch((error: any) => {
            return Observable.throw(`browser.auth.service.ts[createUserInDatabase()] => ${error}` || 'browser.auth.service.ts[createUserInDatabase()] => An unknown error occurred.')
          });
        response.token = idToken;

    return Observable.of(response);
  }

  private getUserFromDatabase(idToken): Observable<Object> {
    var query = {
          query: authUserQuery,
          variables: {
            "idToken": idToken
          }
        },
        response = {
          error: null,
          token: null,
          current: null,
        };
        response.current = this._api.query(query)
          .map(response => response.json())
          .catch((error: any) => {
            response.error = error;
            return Observable.throw(`browser.auth.service.ts[getUserFromDatabase()] => ${error}` || 'browser.auth.service.ts[getUserFromDatabase()] => An unknown error occurred.')
          });
        response.token = idToken;

    return Observable.of(response);
  }

  private setAccessCookies(response: String): Observable<String> {
    console.log(response);
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