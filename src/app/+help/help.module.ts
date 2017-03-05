import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HelpComponent } from './help.component';
import { FaqComponent } from './faq/faq.component';
import { SupportComponent } from './support/support.component';
import { HelpRoutingModule } from './help-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HelpRoutingModule
  ],
  declarations: [
    HelpComponent,
    FaqComponent,
    SupportComponent
  ]
})
export class HelpModule { }
