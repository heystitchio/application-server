import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { DiscoverComponent } from './discover.component';
import { DiscoverRoutingModule } from './discover-routing.module';

@NgModule({
  imports: [
    SharedModule,
    DiscoverRoutingModule
  ],
  declarations: [
    DiscoverComponent
  ]
})
export class DiscoverModule { }
