import { NgModule,
         OpaqueToken }        from '@angular/core';
import { Router }             from '@angular/router';
import { FormsModule }        from '@angular/forms';
import { RouterModule }       from '@angular/router';
import { UniversalModule,
         isBrowser,
         isNode,
         AUTO_PREBOOT }       from 'angular2-universal/browser';
import { IdlePreload,
         IdlePreloadModule }  from '@angularclass/idle-preload';
import { ApolloClient }       from 'apollo-client';
import { ApolloModule }       from 'apollo-angular';
import { client,
         provideClient }      from './apollo.browser';
import { CookieService }      from 'angular2-cookie/services/cookies.service';

import { AppModule,
         AppComponent }       from './+app/app.module';
import { SharedModule }       from './+app/shared/shared.module';
import { CacheService }       from './+app/shared/cache/cache.service';
import { MetaService }        from './+app/shared/meta/meta.service';
import { AUTH_SERVICE }       from './+app/shared/services/auth/auth.service';
import { BrowserAuthService } from './+app/shared/services/auth/browser.auth.service';

import './+app/shared/lib/rxjs-operators';

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

export function getAuthService(CookieService, Router) {
  return new BrowserAuthService(CookieService, Router);
}

export const UNIVERSAL_KEY = 'UNIVERSAL_CACHE';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    UniversalModule,
    FormsModule,
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
    { provide: AUTH_SERVICE, useFactory: getAuthService, deps: [CookieService, Router] },

    CacheService,
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
