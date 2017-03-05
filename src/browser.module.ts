import { ErrorHandler,
         NgModule,
         OpaqueToken }         from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule }        from '@angular/router';
import { Http }                from '@angular/http';
import { UniversalModule,
         isBrowser,
         isNode,
         AUTO_PREBOOT }        from 'angular2-universal/browser';
import { IdlePreload,
         IdlePreloadModule }   from '@angularclass/idle-preload';

import { ApolloClient }        from 'apollo-client';
import { ApolloModule }        from 'apollo-angular';
import { client,
         provideClient }       from './apollo.browser';

import { CookieService }       from 'angular2-cookie/services/cookies.service';

import * as Raven              from 'raven-js';

import { AppModule,
         AppComponent }        from './app/app.module';
import { SharedModule }        from './app/shared/shared.module';
import { CacheService,
         HashService }         from './app/shared/services/cache';
import { ApiService }          from './app/shared/services/api';
import { MetaService }         from './app/shared/services/meta';
import { AuthService }         from './app/auth/services/auth.service';
import { BrowserAuthService }  from './app/auth/services';

import './app/shared/lib/rxjs-operators';

// import * as LRU from 'modern-lru';

export function getLRU(lru?: any) {
  // use LRU for node
  // return lru || new LRU(10);
  return lru || new Map();
}

export function getRequest() {
  return { cookie: document.cookie };
}

export function getResponse() {
  return {};
}

export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';

//Raven Error Reporting
Raven
  .config('https://e090d88b54a342fba41842bf5a5f9d83@sentry.io/142633', {
    // MD5 hash of working project version (e.g. v.1.0.0)
    // Live productions should be prefixed with "LIVE:" (e.g. LIVE:2888cd...)
    release: '2888cd106bd98b888fca74c785bd6cf5'
  })
  .install();

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any) : void {
    Raven.captureException(err.originalError || err);
  }
}


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    UniversalModule,
    ReactiveFormsModule,
    RouterModule.forRoot([], { useHash: false, preloadingStrategy: IdlePreload }),
    ApolloModule.withClient(provideClient),

    IdlePreloadModule.forRoot(),
    SharedModule.forRoot(),
    AppModule,
  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    { provide: 'req', useFactory: getRequest },
    { provide: 'res', useFactory: getResponse },
    { provide: 'LRU', useFactory: getLRU, deps: [] },
    { provide: AuthService, useClass: BrowserAuthService },
    { provide: ErrorHandler, useClass: RavenErrorHandler },

    CacheService,
    HashService,
    MetaService,
    CookieService
  ]
})

export class MainModule {
  
  constructor(
    public cache: CacheService
  ) {
    this.doRehydrate();
  }

  doRehydrate() {
    let defaultValue = {};
    let serverCache = this._getCacheValue(CacheService.KEY, defaultValue);
    this.cache.rehydrate(serverCache);
  }

  _getCacheValue(key: string, defaultValue: any): any {
    const win: any = window;
    if (win[UNIVERSAL_KEY] && win[UNIVERSAL_KEY][key]) {
      let serverCache = defaultValue;
      try {
        serverCache = win[UNIVERSAL_KEY][key];
        if (typeof serverCache !== typeof defaultValue) {
          console.log('Angular Universal: The type of data from the server is different from the default value type');
          serverCache = defaultValue;
        }
      } catch (e) {
        console.log('Angular Universal: There was a problem parsing the server data during rehydrate');
        serverCache = defaultValue;
      }
      return serverCache;
    } else {
      console.log('Angular Universal: UNIVERSAL_CACHE is missing');
    }
    return defaultValue;
  }

}
