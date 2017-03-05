import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { CacheService  } from '../../services/cache/cache.service';
import { HashService  } from '../../services/cache/hash.service';
import { ApiService  } from '../../services/api/api.service';

import { Role } from './role';

@Injectable()
export class RoleService {

  constructor(
    public _api: ApiService,
    public _hash: HashService,
    public _cache: CacheService,
  ) {}

  get(begin, end): Observable<Role[]> {

    let key = this._hash.hashCodeString(`role ${begin} ${end}`);

    if (this._cache.has(key)) {
      return Observable.of(this._cache.get(key));
    }
    // you probably shouldn't .share() and you should write the correct logic
    /*return this._api.query('api/roles')
      .do(json => {
        this._cache.set(key, json);
      })
      .share();*/
  }

}
