import { Component,
         Inject,
         ChangeDetectionStrategy,
         ViewEncapsulation }      from '@angular/core';
import { AUTH_SERVICE,
         AuthService }            from '../../shared/services/auth/auth.service';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    @Inject(AUTH_SERVICE) private _auth: AuthService,
  ) {}

  login(username, password) {
    this._auth.login(username, password);
  }

  loginWithGoogle() {
    this._auth.loginWithGoogle();
  }
}
