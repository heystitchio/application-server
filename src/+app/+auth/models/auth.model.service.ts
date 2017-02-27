import { Inject,
         Injectable }      from '@angular/core';
import { Observable }      from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Action,
         Reducer,
         Store }           from '@ngrx/store';

import { AUTH_SERVICE,
         AuthService }     from '../services';
import { Auth,
         AuthUser }        from './';
import { AuthActions }     from '../actions';

@Injectable()
export class AuthModelService {
  error$: Observable<string>;
  token$: Observable<string>;
  current$: Observable<AuthUser>;

  private actions$ = new BehaviorSubject<Action>({type: AuthActions.INIT, payload: null});

  constructor(
    @Inject(AUTH_SERVICE) private _auth: AuthService,
    private _store: Store<any>
  ) {
    const store$ = this._store.select<Auth>('auth');

    this.error$ = store$.map(data => data['error']);
    this.token$ = store$.map(data => data['token']);
    this.current$ = store$.map(data => data['current']);

    let logins = this.actions$
      .filter(action => action.type === AuthActions.AUTH_LOGIN_USER)
      .do(() => _store.dispatch({type: AuthActions.AUTH_LOGIN_USER_IN_PROGRESS}))
      .mergeMap(action => _auth.login(action.payload)).share();

    let loginSuccess$ = logins.filter((payload: Auth) => payload.token !== null)
      .map((payload) => ({type: AuthActions.AUTH_USER_AUTHENTICATED, payload}));
    let loginFailure$ = logins.filter((payload: Auth) => payload.token === null)
      .map((payload) => ({type: AuthActions.AUTH_LOGIN_USER_FAIL, payload}));

    let signups = this.actions$
      .filter(action => action.type === AuthActions.AUTH_SIGNUP_USER)
      .do(() => _store.dispatch({type: AuthActions.AUTH_SIGNUP_USER_IN_PROGRESS}))
      .mergeMap(action => _auth.signupAndLogin(action.payload)).share();

    let signupSuccess$ = signups.filter((payload: Auth) => payload.token !== null)
      .map((payload) => ({type: AuthActions.AUTH_USER_AUTHENTICATED, payload}));
    let signupFailure$ = signups.filter((payload: Auth) => payload.token === null)
      .map((payload) => ({type: AuthActions.AUTH_SIGNUP_USER_FAIL, payload}));

    let logouts = this.actions$
      .filter(action => action.type === AuthActions.AUTH_LOGOUT_USER)
      .do(() => _store.dispatch({type: AuthActions.AUTH_LOGOUT_USER_IN_PROGRESS}))
      .mergeMap(action => _auth.logout()).share();

    Observable
      .merge(loginSuccess$, loginFailure$, signupSuccess$, signupFailure$, logouts)
      .subscribe((action: Action) => _store.dispatch(action));
  }

  signup(email, password) {
    this.actions$.next({type: AuthActions.AUTH_SIGNUP_USER, payload: {email, password}});
  }

  login(email, password) {
    this.actions$.next({type: AuthActions.AUTH_LOGIN_USER, payload: {email, password}});
  }

  logout() {
    this.actions$.next({type: AuthActions.AUTH_LOGOUT_USER});
  }

}
