import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

import { Inject, Injectable }                      from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable }                              from 'rxjs/Observable';
import gql                                         from 'graphql-tag';

import { AuthService }                             from './';
import { ApiService }                              from '../../shared/services/api';

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
export class ServerAuthService implements AuthService {

  private baseUrl = 'https://heystitchio.auth0.com';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers })

  constructor(
    private _api: ApiService,
    private _http: Http,
    @Inject('req') private _req: any
  ) {}

  public signupAndLogin(): void {
    throw new Error("Signup event cannot be called while doing server side rendering");
  }

  public login(): void {
    throw new Error("Login event cannot be called while doing server side rendering");
  }

  public logout(): void {
    throw new Error("Logout event cannot be called while doing server side rendering");
  }

  public initAuth(): Observable<Object> {
    var token = this._req.cookies['USID'];

    if (token != null) {
      return this.getUserInfo(token)
        .flatMap(data => this.getUserFromDatabase(data['token'], data['user']['user_id']))
        .catch((error: any) => Observable.throw(`browser.auth.service.ts[initAuth()] => ${error}` || 'browser.auth.service.ts[initAuth()] => An unknown error occurred.'));
    }
  }

  private getUserInfo(token: String): Observable<Response> {
    var payload = {
            "id_token": token
          };
    return this._http.post(`${this.baseUrl}/tokeninfo`, payload, this.options)
      .map(response => { return { user: response.json(), token: token }})
      .catch((error: any) => Observable.throw(`browser.auth.service.ts[getUserInfo()] => ${error}` || 'browser.auth.service.ts[getUserInfo()] => An unknown error occurred.'));
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

}
