import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AboutComponent } from './about.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { PressComponent } from './press/press.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  imports: [
    SharedModule,
    AboutRoutingModule
  ],
  declarations: [
    AboutComponent,
    HowItWorksComponent,
    WelcomeComponent,
    WhoWeAreComponent,
    PressComponent
  ]
})
export class AboutModule { }
