import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './404.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '404', component: NotFoundComponent },
      { path: '**', redirectTo: '/404' }
    ])
  ]
})
export class NotFoundRoutingModule { }
