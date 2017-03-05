import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SingleTeamComponent } from './single/single-team.component';
import { TeamDashboardComponent } from './single/dashboard/team-dashboard.component';
import { TeamRoutingModule } from './team-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TeamRoutingModule
  ],
  declarations: [
    SingleTeamComponent,
    TeamDashboardComponent
  ]
})
export class TeamModule { }
