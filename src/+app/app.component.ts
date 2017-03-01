import { Component,
         ChangeDetectionStrategy,
         Inject,
         ViewEncapsulation }      from '@angular/core';
import { Router }                 from '@angular/router';
import { isBrowser }              from 'angular2-universal';

import { AuthModelService }       from './+auth/models';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    public _auth: AuthModelService,
    private _router: Router
  ){
    this._auth.initAuth();
  }
}
