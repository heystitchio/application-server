import { Injectable }            from '@angular/core';
import { Observable }            from 'rxjs/Observable';
import { isNode }                from 'angular2-universal';

import { Apollo,
         ApolloQueryObservable } from 'apollo-angular';
import { ApolloClient,
         ApolloQueryResult,
         WatchQueryOptions,
         MutationOptions,
         SubscriptionOptions }   from 'apollo-client';

import { CacheService  }         from './../cache/cache.service';
import { HashService  }          from './../cache/hash.service';


@Injectable()
export class ApiService {

  constructor(
    public _apollo: Apollo,
    public _cache: CacheService,
    private _hash: HashService
  ) {}

  watchQuery(options: WatchQueryOptions, autoClear: boolean = true): Observable<any> {
    let key = this._hash.hashCodeString(options.toString());

    if (this._cache.has(key)) {
      const cachedResponse = this._cache.get(key);

      if (autoClear) {
        this._cache.remove(key);
      }

      return Observable.of(cachedResponse);
    }

    return this._apollo.watchQuery(options)
      .do(json => { if (isNode) { this._cache.set(key, json); } })
      .share();
  }

  query(options: WatchQueryOptions, autoClear: boolean = true): Observable<any> {
    let key = this._hash.hashCodeString(options.toString());

    if (this._cache.has(key)) {
      const cachedResponse = this._cache.get(key);

      if (autoClear) {
        this._cache.remove(key);
      }
      
      return Observable.of(cachedResponse);
    }

    return this._apollo.query(options)
      .do(json => { if (isNode) { this._cache.set(key, json); } })
      .share();
  }

  mutate(options: MutationOptions): Observable<any> {
    return this._apollo.mutate(options);
  }

  subscribe(options: SubscriptionOptions): Observable<any> {
    return this._apollo.subscribe(options);
  }

  getClient(): ApolloClient {
    return this._apollo.getClient();
  }

}
