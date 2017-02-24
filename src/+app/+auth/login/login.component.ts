import { Component,
         ChangeDetectionStrategy,
         Inject,
         OnInit,
         ViewEncapsulation }      from '@angular/core';

import { MetaService,
         MetaDefinition }         from '../../shared/meta/meta.service';
import { AUTH_SERVICE,
         AuthService }            from '../../shared/services/auth/auth.service';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  meta: MetaDefinition[] = [];

  constructor(
    @Inject(AUTH_SERVICE) private _auth: AuthService,
    private _meta: MetaService
  ) {
    this.meta = [
      { name: 'description', content: 'Set by meta setter service', id: 'desc' },
      // Twitter
      { name: 'twitter:title', content: 'Set by meta setter service' },
      // Google+
      { itemprop: 'name', content: 'Set by meta setter service' },
      { itemprop: 'description', content: 'Set by meta setter service' },
      // Facebook / Open Graph
      { property: 'fb:app_id', content: 'Set by meta setter service' },
      { property: 'og:title', content: 'Set by meta setter service' }
    ];
  }

  ngOnInit() {
    this._meta.setTitle('Log In');
    this._meta.addTags(this.meta);
  }

  login(username, password) {
    this._auth.login(username, password);
  }

  loginWithGoogle() {
    this._auth.loginWithGoogle();
  }
}
