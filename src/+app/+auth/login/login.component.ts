import { Component,
         Inject,
         ChangeDetectionStrategy,
         ViewEncapsulation }      from '@angular/core';
import { AuthService }            from '../../shared/services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    public _auth: AuthService
  ) {}
}
