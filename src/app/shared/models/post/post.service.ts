import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';

import { CacheService  } from '../../services/cache/cache.service';
import { HashService  } from '../../services/cache/hash.service';
import { ApiService  } from '../../services/api/api.service';

import { Post } from './post';

@Injectable()
export class PostService {

  constructor(
    public _api: ApiService,
    public _hash: HashService,
    public _cache: CacheService,
  ) {}

  get(begin, end): Observable<Post[]> {

    let key = this._hash.hashCodeString(`post ${begin} ${end}`);

    if (this._cache.has(key)) {
      return Observable.of(this._cache.get(key));
    }
    // you probably shouldn't .share() and you should write the correct logic
    /*return this._api.query('api/posts')
      .do(json => {
        this._cache.set(key, json);
      })
      .share();*/
  }

}
