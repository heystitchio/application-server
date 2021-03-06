import { ErrorHandler,
         NgModule,
         OpaqueToken }         from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { Http }                from '@angular/http';
import { UniversalModule,
         isBrowser,
         isNode }              from 'angular2-universal/node';

import { ApolloClient }        from 'apollo-client';
import { ApolloModule }        from 'apollo-angular';
import { client,
         provideClient }       from './apollo.node';

import { AppModule,
         AppComponent }        from './app/app.module';
import { SharedModule }        from './app/shared/shared.module';
import { CacheService,
         HashService }         from './app/shared/services/cache';
import { ApiService }          from './app/shared/services/api/api.service';
import { MetaService }         from './app/shared/services/meta';
import { AuthService }        from './app/auth/services/auth.service';
import { ServerAuthService }     from './app/auth/services';

import './app/shared/lib/rxjs-operators';


export function getLRU(): any {
  return new Map();
}

export function getRequest(): any {
  return Zone.current.get('req') || {};
}

export function getResponse(): any {
  return Zone.current.get('res') || {};
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
    { provide: AuthService, useClass: ServerAuthService },

    CacheService,
    HashService,
    MetaService
  ]
})

export class MainModule {

  constructor(
    public cache: CacheService
  ) {}

  universalDoDehydrate = (universalCache) => {
    universalCache[CacheService.KEY] = { APOLLO_STATE: { apollo: { data: client.store.getState().apollo.data }}};
  }

  universalAfterDehydrate = () => {
    this.cache.clear();
  }

}
