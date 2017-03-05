import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WhoWeAreComponent } from './who-we-are/who-we-are.component';
import { PressComponent } from './press/press.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'about', component: AboutComponent },
      { path: 'about/how-it-works', component: HowItWorksComponent },
      { path: 'about/welcome', component: WelcomeComponent },
      { path: 'about/who-we-are', component: WhoWeAreComponent },
      { path: 'about/press', component: PressComponent }
    ])
  ]
})
export class AboutRoutingModule { }
