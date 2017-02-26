import { Component,
         ChangeDetectionStrategy,
         Inject,
         ViewEncapsulation }      from '@angular/core';

import { AUTH_SERVICE,
         AuthService }            from '../../../+auth/services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'main-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class MainNavComponent {
  constructor(
    @Inject(AUTH_SERVICE) public _auth: AuthService
  ){}
}