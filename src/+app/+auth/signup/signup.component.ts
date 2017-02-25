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
         MetaDefinition }         from '../../shared/meta/meta.service';
import { AUTH_SERVICE,
         AuthService }            from '../../shared/services/auth/auth.service';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  meta: MetaDefinition[] = [];
  signupForm: FormGroup;

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

    this.signupForm = _fb.group({
      "email": ["", Validators.required],
      "password": ["", [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }

  ngOnInit(): void {
    this._meta.setTitle('Sign Up');
    this._meta.addTags(this.meta);
  }

  signup(form: FormGroup): void {
    this._auth.signup(form.get('email'), form.get('password'));
  }

  loginWithGoogle(): void {
    this._auth.loginWithGoogle();
  }
}