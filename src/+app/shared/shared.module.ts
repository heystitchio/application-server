import { NgModule,
         ModuleWithProviders }    from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';
import { FormsModule,
         ReactiveFormsModule }    from '@angular/forms';

import { SharedComponentsModule } from './components/components.module';
import { ApiService }             from './cache/api.service';
import { HashService }            from './cache/hash.service';

import { ApplicationService }     from './model/application/application.service';
import { ChatService }            from './model/chat/chat.service';
import { FileService }            from './model/file/file.service';
import { MessageService }         from './model/message/message.service';
import { MilestoneService }       from './model/milestone/milestone.service';
import { PostService }            from './model/post/post.service';
import { ProjectService }         from './model/project/project.service';
import { RoleService }            from './model/role/role.service';
import { TaskService }            from './model/task/task.service';
import { TeamService }            from './model/team/team.service';
import { UserService }            from './model/user/user.service';


const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  SharedComponentsModule
];

const PIPES = [
  // put pipes here
];

const COMPONENTS = [
  // put shared components here
];

const PROVIDERS = [
  ApplicationService,
  ChatService,
  FileService,
  MessageService,
  MilestoneService,
  PostService,
  ProjectService,
  RoleService,
  TaskService,
  TeamService,
  UserService,
  ApiService,
  HashService
]

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
