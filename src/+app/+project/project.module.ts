import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SingleProjectComponent } from './single/single-project.component';
import { ProjectDashboardComponent } from './single/dashboard/project-dashboard.component';
import { ProjectRoutingModule } from './project-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule
  ],
  declarations: [
    SingleProjectComponent,
    ProjectDashboardComponent
  ]
})
export class ProjectModule { }
