import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SingleProjectComponent } from './single/single-project.component';
import { ProjectDashboardComponent } from './single/dashboard/project-dashboard.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'project/:slug', component: SingleProjectComponent },
      { path: 'project/:slug/dashboard', component: ProjectDashboardComponent }
    ])
  ]
})
export class ProjectRoutingModule { }
