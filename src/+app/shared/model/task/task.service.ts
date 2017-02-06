import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { CacheService  } from '../../cache/cache.service';
import { HashService  } from '../../cache/hash.service';
import { ApiService  } from '../../cache/api.service';

import { Task } from './task';

@Injectable()
export class TaskService {

  constructor(
    public _api: ApiService,
    public _hash: HashService,
    public _cache: CacheService,
  ) {}

  get(begin, end): Observable<Task[]> {

    let key = this._hash.hashCodeString(`task ${begin} ${end}`);

    if (this._cache.has(key)) {
      return Observable.of(this._cache.get(key));
    }
    // you probably shouldn't .share() and you should write the correct logic
    return this._api.get('task', begin, end)
      .do(json => {
        this._cache.set(key, json);
      })
      .share();
  }

}
