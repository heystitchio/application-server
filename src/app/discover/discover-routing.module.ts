import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DiscoverComponent } from './discover.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'discover', component: DiscoverComponent }
    ])
  ]
})
export class DiscoverRoutingModule { }
