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
import * as Raven          from 'raven-js';

import { AppModule,
         AppComponent }    from './+app/app.module';
import { SharedModule }    from './+app/shared/shared.module';
import { CacheService }    from './+app/shared/cache/cache.service';
import { MetaService }     from './+app/shared/meta/meta.service';
import { AUTH_SERVICE }    from './+app/shared/services/auth/auth.service';
import { NodeAuthService } from './+app/shared/services/auth/node.auth.service';

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

//Raven Error Reporting
Raven
  .config('https://e090d88b54a342fba41842bf5a5f9d83@sentry.io/142633')
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err:any) : void {
    Raven.captureException(err.originalError || err);
  }
}


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
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: AUTH_SERVICE, useFactory: getAuthService, deps: ['req'] },

    CacheService,
    MetaService,
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
