import { Component,
         ChangeDetectionStrategy,
         Inject,
         OnInit,
         ViewEncapsulation }      from '@angular/core';      
import { FormGroup, 
         FormControl,
         Validators,
         FormBuilder }            from '@angular/forms';
import { Subscription }           from 'rxjs/Subscription';

import { MetaService,
         MetaDefinition }         from '../../../shared/meta/meta.service';
import { AuthModelService }       from '../../models';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public error: string;

  private errorSubscription: Subscription;
  private meta: MetaDefinition[] = [];

  constructor(
    private _auth: AuthModelService,
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

    this.errorSubscription = this._auth.error$.subscribe(error => this.error = error);
  }

  ngOnInit(): void {
    this._meta.setTitle('Log In');
    this._meta.addTags(this.meta);
  }

  login(): void {
    var username: String = this.loginForm.controls['email'].value,
        password: String = this.loginForm.controls['password'].value;

    this._auth.login(username, password);
  }

}
