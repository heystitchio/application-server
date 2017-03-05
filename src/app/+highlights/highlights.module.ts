import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HighlightsComponent } from './highlights.component';
import { HighlightsRoutingModule } from './highlights-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HighlightsRoutingModule
  ],
  declarations: [
    HighlightsComponent
  ]
})
export class HighlightsModule { }
