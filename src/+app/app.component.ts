import { Component,
         ChangeDetectionStrategy,
         ViewEncapsulation }      from '@angular/core';
import { Router }                 from '@angular/router';
import { AuthService }            from './shared/services/auth.service'


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    public _router: Router,
    private _auth: AuthService
  ){
    this._auth.handleAuthentication();
  }
}
