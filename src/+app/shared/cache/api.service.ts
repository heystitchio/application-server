import { Injectable }            from '@angular/core';
import { Observable }            from 'rxjs/Observable';
import { isNode }                from 'angular2-universal';

import { Apollo,
         ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult }     from 'apollo-client';
import gql                       from 'graphql-tag';

import { CacheService  }         from './cache.service';
import { HashService  }          from './hash.service';


@Injectable()
export class ApiService {

  constructor(
    public _apollo: Apollo,
    public _cache: CacheService,
    private _hash: HashService
  ) {}

  get(query, autoClear: boolean = true) {
    // You want to return the cache if there is a response in it. 
    // This would cache the first response so if your API isn't idempotent you probably want to 
    // remove the item from the cache after you use it. LRU of 1 
    let key = this._hash.hashCodeString(query);

    if (this._cache.has(key)) {

      const cachedResponse = this._cache.get(key);

      // if autoClear is set to false, item will stay in cache until you manually clear it
      // ie: trigger CacheService.remove(url /* with the url/key used here */)

      if (autoClear) {
        // remove previous value automatically for now
        this._cache.remove(key);
      }

      return Observable.of(cachedResponse);
    }

    // note: you probably shouldn't .share() and you should write the correct logic

    return this._apollo.watchQuery(query)
      .do(json => { if (isNode) { this._cache.set(key, json); } })
      .share();
  }

}
