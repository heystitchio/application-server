import { Component,
         ChangeDetectionStrategy,
         Inject,
         OnInit,
         ViewEncapsulation }      from '@angular/core';      
import { FormGroup, 
         FormControl,
         Validators,
         FormBuilder }            from '@angular/forms'

import { MetaService,
         MetaDefinition }         from '../../../shared/meta/meta.service';
import { AUTH_SERVICE,
         AuthService }            from '../../services';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent implements OnInit {
  user: Object;
  meta: MetaDefinition[] = [];
  loginForm: FormGroup;
  loginError:String;

  constructor(
    @Inject(AUTH_SERVICE) private _auth: AuthService,
    private _meta: MetaService,
    private _fb: FormBuilder
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

    this.loginForm = _fb.group({
      "email": ["", Validators.required],
      "password": ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this._meta.setTitle('Log In');
    this._meta.addTags(this.meta);
  }

  login(): void {
    var email: String = this.loginForm.controls['email'].value,
        password: String = this.loginForm.controls['password'].value;

    this._auth.login(email, password)
      .then(user => this.user = user)
      .catch(err => this.loginError = err.message);
  }

  loginWithGoogle(): void {
    this._auth.loginWithGoogle();
  }
}
