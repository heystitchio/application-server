import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isNode } from 'angular2-universal';

import { CacheService  } from './cache.service';
import { HashService  } from './hash.service';

import { APPLICATIONS } from '../mock/mock-applications';
import { CHATS } from '../mock/mock-chats';
import { FILES } from '../mock/mock-files';
import { MESSAGES } from '../mock/mock-messages';
import { MILESTONES } from '../mock/mock-milestones';
import { POSTS } from '../mock/mock-posts';
import { PROJECTS } from '../mock/mock-projects';
import { ROLES } from '../mock/mock-roles';
import { TASKS } from '../mock/mock-tasks';
import { TEAMS } from '../mock/mock-teams';
import { USERS } from '../mock/mock-users';

@Injectable()
export class ApiService {

  constructor(
    public _cache: CacheService,
    private _hash: HashService
  ) {}

  get(context: string, begin?: number, end?: number, autoClear: boolean = true) {
    // You want to return the cache if there is a response in it. 
    // This would cache the first response so if your API isn't idempotent you probably want to 
    // remove the item from the cache after you use it. LRU of 1 
    let key = this._hash.hashCodeString(context + begin + end);

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

    return this.parseDb(context, begin, end)
      .do(json => { if (isNode) { this._cache.set(key, json); } })
      .share();
  }

  parseDb(context: string, begin?: number, end?: number): Observable<any> {
    var data = [];

    switch(context) {
      case "application":
        data = APPLICATIONS.slice(begin, end);
        return Observable.of(new Object()).map(data =>JSON.stringify(data));
      case "chat":
        data = CHATS.slice(begin, end);
        return this.mapJson(data);
      case "file":
        data = FILES.slice(begin, end);
        return this.mapJson(data);
      case "message":
        data = MESSAGES.slice(begin, end);
        return this.mapJson(data);
      case "milestone":
        data = MILESTONES.slice(begin, end);
        return this.mapJson(data);
      case "post":
        data = POSTS.slice(begin, end);
        return this.mapJson(data);
      case "project":
        data = PROJECTS.slice(begin, end);
        return Observable.of(new Object()).map(data =>JSON.stringify(data));
      case "role":
        data = ROLES.slice(begin, end);
        return this.mapJson(data);
      case "task":
        data = TASKS.slice(begin, end);
        return this.mapJson(data);
      case "team":
        data = TEAMS.slice(begin, end);
        return this.mapJson(data);
      case "user":
        data = USERS.slice(begin, end);
        return this.mapJson(data);
      default:
        return this.mapJson(data);
    }
  }

  mapJson(object) {
    return object
      .map(res => res.json())
      .catch(err => {
        console.log('Error: ', err);
        return Observable.throw(err);
      });
  }

}
