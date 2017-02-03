import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { NewslettersComponent } from './newsletters/newsletters.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'contact', component: ContactComponent },
      { path: 'newsletters', component: NewslettersComponent }
    ])
  ]
})
export class ContactRoutingModule { }
