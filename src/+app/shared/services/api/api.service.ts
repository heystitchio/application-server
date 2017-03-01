import { Injectable }            from '@angular/core';
import { Observable }            from 'rxjs/Observable';
import { isNode }                from 'angular2-universal';
import { Store }                 from '@ngrx/store';

import { Apollo,
         ApolloQueryObservable } from 'apollo-angular';
import { ApolloClient,
         ApolloQueryResult,
         WatchQueryOptions,
         MutationOptions,
         SubscriptionOptions }   from 'apollo-client';

import { CacheService  }         from './../cache';
import { HashService  }          from './../cache';
import { Auth }                  from '../../../+auth/models';


@Injectable()
export class ApiService {

  private token$: Observable<string>;

  constructor(
    public _apollo: Apollo,
    public _cache: CacheService,
    private _store: Store<any>,
    private _hash: HashService
  ) {
    this.token$ = _store.select<Auth>('auth')
      .map(data => data['token'])
      .filter(token => !!token);
  }

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
