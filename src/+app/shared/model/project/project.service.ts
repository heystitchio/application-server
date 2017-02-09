import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { CacheService  } from '../../cache/cache.service';
import { HashService  } from '../../cache/hash.service';
import { ApiService  } from '../../cache/api.service';

import { Project } from './project';

@Injectable()
export class ProjectService {

  constructor(
    public _api: ApiService,
    public _hash: HashService,
    public _cache: CacheService,
  ) {}

  get(begin, end): Observable<Project[]> {

    let key = this._hash.hashCodeString(`project ${begin} ${end}`);

    if (this._cache.has(key)) {
      return Observable.of(this._cache.get(key));
    }
    // you probably shouldn't .share() and you should write the correct logic
    return this._api.get('api/projects')
      .do(json => {
        this._cache.set(key, json);
      })
      .share();
  }

}
