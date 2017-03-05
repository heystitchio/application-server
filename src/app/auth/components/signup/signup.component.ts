import { Component,
         ChangeDetectionStrategy,
         Inject,
         OnDestroy,
         OnInit,
         ViewEncapsulation }      from '@angular/core';
import { Router }                 from '@angular/router'; 
import { FormGroup, 
         FormControl,
         Validators,
         FormBuilder }            from '@angular/forms'
import { Subscription }           from 'rxjs/Subscription';

import { MetaService,
         MetaDefinition }         from '../../../shared/services/meta';
import { AuthModelService }       from '../../models';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm: FormGroup;
  public error: string;

  private tokenSubscription: Subscription;
  private errorSubscription: Subscription;
  private meta: MetaDefinition[] = [];

  constructor(
    private _auth: AuthModelService,
    private _router: Router,
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

    this.tokenSubscription = this._auth.token$.subscribe(token => {
      if (token) { this._router.navigate(['/discover']); }
    });

    this.errorSubscription = this._auth.error$.subscribe(error => this.error = error);
  }

  ngOnInit(): void {
    this._meta.setTitle('Sign Up');
    this._meta.addTags(this.meta);
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

  signup(): void {
    var email: String = this.signupForm.controls['email'].value,
        password: String = this.signupForm.controls['password'].value;

    this._auth.signup(email, password);
  }
  
}