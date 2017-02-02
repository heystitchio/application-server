import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SingleUserComponent } from './single/single-user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    SingleUserComponent
  ]
})
export class UserModule { }
