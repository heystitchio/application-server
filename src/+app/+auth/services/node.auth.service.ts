import { Inject,
         Injectable }  from '@angular/core';
import { Observable }  from 'rxjs/Observable';
import gql             from 'graphql-tag';

import { AuthService } from './';
import { ApiService }  from '../../shared/services/api';

const authUserQuery = gql`
  query User($idToken: String!) {
    User(auth0UserId: $idToken) {
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


export class NodeAuthService implements AuthService {

  constructor(
    @Inject('req') private _req: any,
    private _api: ApiService
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
    var idToken = this._req.cookies['USID'];

    if (idToken) {
      return this.getUserFromDatabase(idToken)
        .catch((error: any) => Observable.throw(`browser.auth.service.ts[initAuth()] => ${error}` || 'browser.auth.service.ts[initAuth()] => An unknown error occurred.'));
    }
  }

  private getUserFromDatabase(idToken): Observable<Object> {
  var query = {
        query: authUserQuery,
        variables: {
          "idToken": idToken
        }
      };
  return this._api.query(query)
    .map(response => { return { error: null, token: idToken, user: response }})
    .catch((error: any) => Observable.throw(`browser.auth.service.ts[getUserFromDatabase()] => ${error}` || 'browser.auth.service.ts[getUserFromDatabase()] => An unknown error occurred.'));
  }

}
