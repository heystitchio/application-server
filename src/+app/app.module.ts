import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DiscoverModule } from './+discover/discover.module';
import { AboutModule } from './+about/about.module';
import { TodoModule } from './+todo/todo.module';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, XLargeDirective } from './app.component';


@NgModule({
  declarations: [ AppComponent, XLargeDirective ],
  imports: [
    SharedModule,
    DiscoverModule,
    AboutModule,
    TodoModule,
    AppRoutingModule
  ]
})
export class AppModule {
}

export { AppComponent } from './app.component';
