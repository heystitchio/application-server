import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ExploreComponent } from './explore.component';
import { FeaturedComponent } from './featured/featured.component';
import { PopularComponent } from './popular/popular.component';
import { CategoriesComponent } from './categories/categories.component';
import { ExploreRoutingModule } from './explore-routing.module';

@NgModule({
  imports: [
    SharedModule,
    ExploreRoutingModule
  ],
  declarations: [
    ExploreComponent,
    FeaturedComponent,
    PopularComponent,
    CategoriesComponent
  ]
})
export class ExploreModule { }
