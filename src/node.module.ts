import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { UniversalModule,
         isBrowser,
         isNode }         from 'angular2-universal/node';
import { ApolloClient }   from 'apollo-client';
import { ApolloModule }   from 'apollo-angular';
import { client,
         provideClient }  from './apollo.node';

import { AppModule,
         AppComponent }   from './+app/app.module';
import { SharedModule }   from './+app/shared/shared.module';
import { CacheService }   from './+app/shared/cache/cache.service';
import { MetaService }    from './+app/shared/meta/meta.service';


export function getLRU() {
  return new Map();
}

export function getRequest() {
  return Zone.current.get('req') || {};
}

export function getResponse() {
  return Zone.current.get('res') || {};
}

export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    UniversalModule,
    FormsModule,
    RouterModule.forRoot([], { useHash: false }),
    ApolloModule.withClient(provideClient),

    SharedModule.forRoot(),
    AppModule,
  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    { provide: 'req', useFactory: getRequest },
    { provide: 'res', useFactory: getResponse },
    { provide: 'LRU', useFactory: getLRU, deps: [] },

    CacheService,
    MetaService,
  ]
})

export class MainModule {

  constructor(
    public cache: CacheService
  ) {}

  universalDoDehydrate = (universalCache) => {
    universalCache['__APOLLO_STATE__'] = {apollo: {data: client.store.getState().apollo.data}};
  }

  universalAfterDehydrate = () => {
    // comment out if LRU provided at platform level to be shared between each user
    this.cache.clear();
  }

}
