import { Component,
         ChangeDetectionStrategy,
         Inject,
         ViewEncapsulation }      from '@angular/core';
import { Router }                 from '@angular/router';
import { isBrowser }              from 'angular2-universal';

import { AUTH_SERVICE,
         AuthService }            from './+auth/services/auth.service';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    @Inject(AUTH_SERVICE) _auth: AuthService,
    public _router: Router
  ){
    if (isBrowser) {
      _auth.initAuth();
    }
  }
}
