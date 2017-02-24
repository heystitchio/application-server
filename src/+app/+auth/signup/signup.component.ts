import { Component,
         Inject,
         ChangeDetectionStrategy,
         ViewEncapsulation }      from '@angular/core';
import { AUTH_SERVICE,
         AuthService }            from '../../shared/services/auth/auth.service';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  constructor(
    @Inject(AUTH_SERVICE) private _auth: AuthService,
  ) {}

  signup(username, password) {
    this._auth.signup(username, password);
  }

  loginWithGoogle() {
    this._auth.loginWithGoogle();
  }
}