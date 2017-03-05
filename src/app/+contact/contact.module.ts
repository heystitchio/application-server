import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ContactComponent } from './contact.component';
import { NewslettersComponent } from './newsletters/newsletters.component';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ContactRoutingModule
  ],
  declarations: [
    ContactComponent,
    NewslettersComponent
  ]
})
export class ContactModule { }
