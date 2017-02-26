import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './../components/login/login.component';
import { SignupComponent } from './../components/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ]
})
export class AuthModule { }
