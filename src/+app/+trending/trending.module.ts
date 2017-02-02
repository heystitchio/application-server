import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TrendingComponent } from './trending.component';
import { TrendingUsersComponent } from './users/trending-users.component';
import { TrendingTeamsComponent } from './teams/trending-teams.component';
import { TrendingRoutingModule } from './trending-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TrendingRoutingModule
  ],
  declarations: [
    TrendingComponent,
    TrendingUsersComponent,
    TrendingTeamsComponent
  ]
})
export class TrendingModule { }
