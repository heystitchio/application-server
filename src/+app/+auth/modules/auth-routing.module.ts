import { NgModule }        from '@angular/core';
import { RouterModule }    from '@angular/router';

import { LoginComponent,
         SignupComponent } from '../components';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ])
  ]
})
export class AuthRoutingModule { }
