import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { NewslettersComponent } from './newsletters/newsletters.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: ContactComponent },
      { path: 'signup', component: NewslettersComponent }
    ])
  ]
})
export class ContactRoutingModule { }
