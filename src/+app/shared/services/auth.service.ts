import { Injectable,
         Inject }          from '@angular/core';
import { Router,
         ActivatedRoute }  from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { isNode }          from 'angular2-universal';

declare var auth0: any;


@Injectable()
export class AuthService {

  auth = new auth0.WebAuth({
    domain: 'heystitchio.auth0.com',
    clientID: 'Uxh1y3P6CnpfzyOk7nHNR67ukfXSgOpC',
    callbackURL: 'http://localhost:3000/',
    responseType: 'token id_token'
  });

  constructor(
    @Inject('req') req: any,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  public handleAuthentication(): void {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        this._router.navigate(['/']);
      } else if (authResult && authResult.error) {
        alert('Error: ' + authResult.error);
      }
    });
  }

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
        this._router.navigate(['/']);
      }
    });
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

  public loginWithGoogle(): void {
    this.auth.authorize({
      connection: 'google-oauth2',
    });
  }

  public isAuthenticated(): boolean {
    return tokenNotExpired();
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
  }

  private setUser(authResult): void {
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
  }
}