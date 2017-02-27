import { Injectable }    from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import gql from 'graphql-tag';

import { AuthService }   from './';
import { ApiService }    from '../../shared/services/api';

declare var auth0: any;

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

  private _auth = new auth0.WebAuth({
    domain: 'heystitchio.auth0.com',
    clientID: 'mSKfZ1UMwag0Vibr2DzbURdX6wgf5z72',
    callbackURL: 'http://localhost:3000',
    responseType: 'token id_token'
  });

  constructor(
    private _cookies: CookieService,
    private _api: ApiService
  ) {}

  public signupAndLogin(email: String, password: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this._auth.signupAndAuthorize({
        connection: 'Username-Password-Authentication',
        email,
        password,
      }, (err, authResult) => {
        if (err) {
          reject(Error(`browser.auth.service.ts[signupAndLogin()] => ${err.description}`))
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setAccessCookie(authResult.accessToken, authResult.idToken)
            .then(res => this.getAuthenticatedUser(res.accessToken, res.idToken, 'signupAndLogin'))
            .then(user => resolve(user))
            .catch(err => reject(Error(`browser.auth.service.ts[signupAndLogin()] => ${err}`)));
        }
      });
    });
  }

  public login(username: String, password: String): Promise<any> {
    return new Promise((resolve, reject) => {
      this._auth.client.login({
        realm: 'Username-Password-Authentication',
        username,
        password
      }, (err, authResult) => {
        if (err) {
          reject(Error(`browser.auth.service.ts[login()] => ${err.description}`));
        }
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setAccessCookie(authResult.accessToken, authResult.idToken)
            .then(res => this.getAuthenticatedUser(res.accessToken, res.idToken, 'login'))
            .then(user => resolve(user))
            .catch(err => reject(Error(`browser.auth.service.ts[login()] => ${err}`)));
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
        this._cookies.remove('USID');
      }
      catch(err) {
        reject(Error(`browser.auth.service.ts[logout()] => ${err}`));
      }
      resolve({});
    });
  }

  public isAuthenticated() {
    return true;
  }

  public initAuth() {
    return new Promise((resolve, reject) => {
      var accessToken: String,
          idToken: String;
      try {
        accessToken = this._cookies.get('AUID');
        idToken = this._cookies.get('USID');
      }
      catch (err) {
        reject(Error(`browser.auth.service.ts[initAuth()] => ${err}`));
      }
      if (accessToken && idToken) {
        this.getAuthenticatedUser(accessToken, idToken, 'init')
          .then(user => resolve(user))
          .catch(err => reject(Error(`browser.auth.service.ts[initAuth()] => ${err}`)))
      } else {
        resolve({
          id: null,
          name: null,
          email: null,
          emailConfirm: null
        });
      }
    });
  }

  private getAuthenticatedUser(accessToken: String, idToken: String, context: String) {
    return new Promise((resolve, reject) => {
      var query: any,
          id: String = idToken,
          access: String = accessToken;

      if (context === 'signupAndLogin') {
        var userObj = this._auth.client.userInfo(access, function(err, user) {
            if (err) {
              reject(`browser.auth.service.ts[getAuthenticatedUser()] => ${err}`);
            } else {
              return user;
          }}),
          xhr = userObj.request.xhr,
          response = JSON.parse(xhr.responseText);

          console.log(id, response);

        query = {
            mutation: createUserMutation,
            variables: {
              "idToken": id,
              "username": response.name,
              "email": response.email,
              "avatarUrl": response.picture
            }
          };
        this._api.mutate(query)
          .do(response => {
            if (response.errors) {
              reject(Error(`browser.auth.service.ts[getAuthenticatedUser()] => ${response.errors[0].message}`));
            } else {
              resolve(response.data.createUser);
            }
          });
      } else if (context === 'login' || context === 'init') {
        query = {
          query: authUserQuery,
          variables: {
            "idToken": id
          }
        }
        this._api.query(query)
          .do(response => {
            if (response.errors) {
              reject(Error(`browser.auth.service.ts[getAuthenticatedUser()] => ${response.errors[0].message}`));
            } else {
              resolve(response.data.createUser);
            }
          });
      } else {
        reject(Error('browser.auth.service.ts[getAuthenticatedUser()] => Unknown context provided for \"getAuthenticatedUser()\"'));
      }
    });
  }

  private setAccessCookie(accessToken: string, idToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this._cookies.put('AUID', accessToken);
        this._cookies.put('USID', idToken);
      }
      catch (err) {
        reject(Error(`browser.auth.service.ts[setAccessCookie()] => ${err}`));
      }
      resolve({accessToken, idToken});
    });
  } 

  /*private setUserContext(user): void {
    this._error.setUserContext(user);
  }

  private removeUserContext(): void {
    this._error.removeUserContext();
  }*/
  
}
