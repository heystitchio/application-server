import { Component,
         ChangeDetectionStrategy,
         Inject,
         OnInit,
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
export class AppComponent implements OnInit {

  constructor(
    public _auth: AuthModelService,
    public _router: Router
  ){}

  ngOnInit() {
    this._auth.initAuth();
  }
  
}
