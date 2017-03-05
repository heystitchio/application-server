import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create.component';
import { CreateRoutingModule } from './create-routing.module';

@NgModule({
  imports: [
    SharedModule,
    CreateRoutingModule
  ],
  declarations: [
    CreateComponent
  ]
})
export class CreateModule { }
