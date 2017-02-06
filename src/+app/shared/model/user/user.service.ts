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

  get(begin, end): Observable<User[]> {

    let key = this._hash.hashCodeString(`user ${begin} ${end}`);

    if (this._cache.has(key)) {
      return Observable.of(this._cache.get(key));
    }
    // you probably shouldn't .share() and you should write the correct logic
    return this._api.get('user', begin, end)
      .do(json => {
        this._cache.set(key, json);
      })
      .share();
  }

}
