import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { JobsComponent } from './jobs.component';
import { JobsRoutingModule } from './jobs-routing.module';

@NgModule({
  imports: [
    SharedModule,
    JobsRoutingModule
  ],
  declarations: [
    JobsComponent
  ]
})
export class JobsModule { }
