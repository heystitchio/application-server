import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { CacheService  } from '../../cache/cache.service';
import { HashService  } from '../../cache/hash.service';
import { ApiService  } from '../../cache/api.service';

import { User } from './user';

@Injectable()
export class UserService {

  constructor(
    public _api: ApiService,
    public _hash: HashService,
    public _cache: CacheService,
  ) {}

  get(query): Observable<User[]> {

    let key = this._hash.hashCodeString(query);

    if (this._cache.has(key)) {
      return Observable.of(this._cache.get(key));
    }
    return this._api.get(query)
      .do(json => {
        this._cache.set(key, json);
      })
      .share();
  }

}
