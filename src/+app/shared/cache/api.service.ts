import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CacheService  } from './cache.service';

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

  get(context: string, begin?: number, end?: number) {
    switch(context) {
      case "application":
        return this.mapJson(APPLICATIONS.slice(begin, end));
      case "chat":
        return this.mapJson(CHATS.slice(begin, end));
      case "file":
        return this.mapJson(FILES.slice(begin, end));
      case "message":
        return this.mapJson(MESSAGES.slice(begin, end));
      case "milestone":
        return this.mapJson(MILESTONES.slice(begin, end));
      case "post":
        return this.mapJson(POSTS.slice(begin, end));
      case "project":
        return this.mapJson(PROJECTS.slice(begin, end));
      case "role":
        return this.mapJson(ROLES.slice(begin, end));
      case "task":
        return this.mapJson(TASKS.slice(begin, end));
      case "team":
        return this.mapJson(TEAMS.slice(begin, end));
      case "user":
        return this.mapJson(USERS.slice(begin, end));
      default:
        return '';
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
