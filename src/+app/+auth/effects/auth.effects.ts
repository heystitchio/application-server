import { Inject,
         Injectable } from '@angular/core';
import { Effect,
         Actions,
         toPayload }  from '@ngrx/effects';
import { Action }     from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthActions } from '../actions/';
import { AUTH_SERVICE,
         AuthService } from '../services/';


@Injectable()
export class AuthEffects {

  constructor(
    @Inject(AUTH_SERVICE) private _auth: AuthService,
    private actions$: Actions
  ) {}

  @Effect() loginUser$ = this.actions$
    .ofType(AuthActions.AUTH_LOGIN_USER)
    .map(toPayload)
    .switchMap(({ email, password }) => this._auth.login(email, password)
      .map(user => ({ type: AuthActions.AUTH_LOGIN_USER_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_LOGIN_USER_FAIL, payload: error }))
    );

  @Effect() signupUser$ = this.actions$
    .ofType(AuthActions.AUTH_SIGNUP_USER)
    .map(toPayload)
    .switchMap(({ username, email, password }) => this._auth.signup(username, email, password)
      .map(user => ({ type: AuthActions.AUTH_SIGNUP_USER_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_SIGNUP_USER_FAIL, payload: error }))
    );

  @Effect() updateProfile$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_PROFILE)
    .map(toPayload)
    .switchMap(({ user }) => this._auth.updateUser(user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_PROFILE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_PROFILE_FAIL, payload: error }))
    );

  @Effect() addToProjectAdmins$ = this.actions$
    .ofType(AuthActions.AUTH_ADD_TO_PROJECT_ADMINS)
    .map(toPayload)
    .switchMap(({ project, user }) => this._auth.addToProjectAdmins(project, user)
      .map(user => ({ type: AuthActions.AUTH_ADD_TO_PROJECT_ADMINS_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_ADD_TO_PROJECT_ADMINS_FAIL, payload: error }))
    );
  
}
