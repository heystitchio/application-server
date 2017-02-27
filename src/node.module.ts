import { ErrorHandler,
         NgModule,
         OpaqueToken }     from '@angular/core';
import { ReactiveFormsModule }     from '@angular/forms';
import { RouterModule }    from '@angular/router';
import { UniversalModule,
         isBrowser,
         isNode }          from 'angular2-universal/node';

import { ApolloClient }    from 'apollo-client';
import { ApolloModule }    from 'apollo-angular';
import { client,
         provideClient }   from './apollo.node';

import { AppModule,
         AppComponent }    from './+app/app.module';
import { SharedModule }    from './+app/shared/shared.module';
import { CacheService }    from './+app/shared/services/cache/cache.service';
import { MetaService }     from './+app/shared/meta/meta.service';
import { AUTH_SERVICE }    from './+app/+auth/services/auth.service';
import { NodeAuthService } from './+app/+auth/services/node.auth.service';

import './+app/shared/lib/rxjs-operators';

declare var authenticationId: any;

export function getLRU(): any {
  return new Map();
}

export function getRequest(): any {
  return Zone.current.get('req') || {};
}

export function getResponse(): any {
  return Zone.current.get('res') || {};
}

export function getAuthService(req) {
  return new NodeAuthService(req);
}

export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    UniversalModule,
    ReactiveFormsModule,
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
    { provide: AUTH_SERVICE, useFactory: getAuthService, deps: ['req'] },

    CacheService,
    MetaService
  ]
})

export class MainModule {

  constructor(
    public cache: CacheService
  ) {}

  universalDoDehydrate = (universalCache) => {
    universalCache[CacheService.KEY] = {apollo: {data: client.store.getState().apollo.data}};
  }

  universalAfterDehydrate = () => {
    this.cache.clear();
  }

}
