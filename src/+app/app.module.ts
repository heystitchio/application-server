import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DiscoverModule } from './+discover/discover.module';
import { AboutModule } from './+about/about.module';
import { AuthModule } from './+auth/auth.module';
import { ContactModule } from './+contact/contact.module';
import { CreateModule } from './+create/create.module';

import { NotFoundRoutingModule } from './+404/404-routing.module';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    SharedModule,
    DiscoverModule,
    AboutModule,
    AuthModule,
    ContactModule,
    CreateModule,
    AppRoutingModule,
    NotFoundRoutingModule
  ]
})
export class AppModule {
}

export { AppComponent } from './app.component';
