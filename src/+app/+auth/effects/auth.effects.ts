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
  .switchMap(() => this._auth.login()
    .then(user => ({ type: AuthActions.AUTH_LOGIN_USER_SUCCESS, payload: user }))
    .catch(error => Observable.of({ type: AuthActions.AUTH_LOGIN_USER_FAIL, payload: error }))
  );
  
}
