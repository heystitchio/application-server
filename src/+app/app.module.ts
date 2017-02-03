import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AboutModule } from './+about/about.module';
import { AuthModule } from './+auth/auth.module';
import { ContactModule } from './+contact/contact.module';
import { CreateModule } from './+create/create.module';
import { DiscoverModule } from './+discover/discover.module';
import { ExploreModule } from './+explore/explore.module';
import { HelpModule } from './+help/help.module';
import { HighlightsModule } from './+highlights/highlights.module';
import { JobsModule } from './+jobs/jobs.module';
import { ProjectModule } from './+project/project.module';
import { SearchModule } from './+search/search.module';
import { SettingsModule } from './+settings/settings.module';
import { TeamModule } from './+team/team.module';
import { TermsModule } from './+terms/terms.module';
import { TrendingModule } from './+trending/trending.module';
import { UserModule } from './+user/user.module';

import { NotFoundRoutingModule } from './+404/404-routing.module';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './+404/404.component';


@NgModule({
  declarations: [ 
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    AboutModule,
    AuthModule,
    ContactModule,
    CreateModule,
    DiscoverModule,
    ExploreModule,
    HelpModule,
    HighlightsModule,
    JobsModule,
    ProjectModule,
    SearchModule,
    SettingsModule,
    TeamModule,
    TermsModule,
    TrendingModule,
    UserModule,
    AppRoutingModule,
    NotFoundRoutingModule
  ]
})
export class AppModule {
}

export { AppComponent } from './app.component';
