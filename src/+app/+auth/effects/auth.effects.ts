import { Inject,
         Injectable } from '@angular/core';
import { Effect,
         Actions,
         toPayload }  from '@ngrx/effects';
import { Action }     from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthActions } from '../actions/';
import { AUTH_SERVICE,
         AuthService } from '../services/';


@Injectable()
export class AuthEffects {

  constructor(
    @Inject(AUTH_SERVICE) private _auth: AuthService,
    private actions$: Actions
  ) {}

  // Authorisation Effects
  @Effect() loginUser$ = this.actions$
    .ofType(AuthActions.AUTH_LOGIN_USER)
    .map(toPayload)
    .switchMap(({ email, password }) => this._auth.login(email, password)
      .map(user => ({ type: AuthActions.AUTH_LOGIN_USER_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_LOGIN_USER_FAIL, payload: error }))
    );

  @Effect() signupUser$ = this.actions$
    .ofType(AuthActions.AUTH_SIGNUP_USER)
    .map(toPayload)
    .switchMap(({ username, email, password }) => this._auth.signup(username, email, password)
      .map(user => ({ type: AuthActions.AUTH_SIGNUP_USER_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_SIGNUP_USER_FAIL, payload: error }))
    );

  // User Profile Effects
  @Effect() updateProfile$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_PROFILE)
    .map(toPayload)
    .switchMap(({ user }) => this._auth.updateUser(user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_PROFILE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_PROFILE_FAIL, payload: error }))
    );

  // Project Admin Effects
  @Effect() addToProjectAdmins$ = this.actions$
    .ofType(AuthActions.AUTH_ADD_TO_PROJECT_ADMINS)
    .map(toPayload)
    .switchMap(({ project, user }) => this._auth.addToProjectAdmins(project, user)
      .map(user => ({ type: AuthActions.AUTH_ADD_TO_PROJECT_ADMINS_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_ADD_TO_PROJECT_ADMINS_FAIL, payload: error }))
    );

  @Effect() removeFromProjectAdmins$ = this.actions$
    .ofType(AuthActions.AUTH_ADD_TO_PROJECT_ADMINS)
    .map(toPayload)
    .switchMap(({ project, user }) => this._auth.removeFromProjectAdmins(project, user)
      .map(user => ({ type: AuthActions.AUTH_ADD_TO_PROJECT_ADMINS_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_ADD_TO_PROJECT_ADMINS_FAIL, payload: error }))
    );

  // Task Admin Effects
  @Effect() addToTaskAdmins$ = this.actions$
    .ofType(AuthActions.AUTH_ADD_TO_TASK_ADMINS)
    .map(toPayload)
    .switchMap(({ task, user }) => this._auth.addToTaskAdmins(task, user)
      .map(user => ({ type: AuthActions.AUTH_ADD_TO_TASK_ADMINS_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_ADD_TO_TASK_ADMINS_FAIL, payload: error }))
    );
  
  @Effect() removeFromTaskAdmins$ = this.actions$
    .ofType(AuthActions.AUTH_REMOVE_FROM_TASK_ADMINS)
    .map(toPayload)
    .switchMap(({ task, user }) => this._auth.removeFromTaskAdmins(task, user)
      .map(user => ({ type: AuthActions.AUTH_REMOVE_FROM_TASK_ADMINS_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_REMOVE_FROM_TASK_ADMINS_FAIL, payload: error }))
    );

  // Team Admin Effects
  @Effect() addToTeamAdmins$ = this.actions$
    .ofType(AuthActions.AUTH_ADD_TO_TEAM_ADMINS)
    .map(toPayload)
    .switchMap(({ team, user }) => this._auth.addToTeamAdmins(team, user)
      .map(user => ({ type: AuthActions.AUTH_ADD_TO_TEAM_ADMINS_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_ADD_TO_TEAM_ADMINS_FAIL, payload: error }))
    );
  
  @Effect() removeFromTeamAdmins$ = this.actions$
    .ofType(AuthActions.AUTH_REMOVE_FROM_TEAM_ADMINS)
    .map(toPayload)
    .switchMap(({ team, user }) => this._auth.removeFromTeamAdmins(team, user)
      .map(user => ({ type: AuthActions.AUTH_REMOVE_FROM_TEAM_ADMINS_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_REMOVE_FROM_TEAM_ADMINS_FAIL, payload: error }))
    );

  // Assigned Task Effects
  @Effect() assignToTask$ = this.actions$
    .ofType(AuthActions.AUTH_ASSIGN_TO_TASK)
    .map(toPayload)
    .switchMap(({ task, user }) => this._auth.assignToTask(task, user)
      .map(user => ({ type: AuthActions.AUTH_ASSIGN_TO_TASK_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_ASSIGN_TO_TASK_FAIL, payload: error }))
    );
  
  @Effect() unassignFromTask$ = this.actions$
    .ofType(AuthActions.AUTH_UNASSIGN_FROM_TASK)
    .map(toPayload)
    .switchMap(({ task, user }) => this._auth.unassignFromTask(task, user)
      .map(user => ({ type: AuthActions.AUTH_UNASSIGN_FROM_TASK_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UNASSIGN_FROM_TASK_FAIL, payload: error }))
    );

  // Followed Projects Effects
  @Effect() followProject$ = this.actions$
    .ofType(AuthActions.AUTH_FOLLOW_PROJECT)
    .map(toPayload)
    .switchMap(({ project, user }) => this._auth.followProject(project, user)
      .map(user => ({ type: AuthActions.AUTH_FOLLOW_PROJECT_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_FOLLOW_PROJECT_FAIL, payload: error }))
    );
  
  @Effect() unfollowProject$ = this.actions$
    .ofType(AuthActions.AUTH_UNFOLLOW_PROJECT)
    .map(toPayload)
    .switchMap(({ project, user }) => this._auth.unfollowProject(project, user)
      .map(user => ({ type: AuthActions.AUTH_UNFOLLOW_PROJECT_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UNFOLLOW_PROJECT_FAIL, payload: error }))
    );

  // Member Projects
  @Effect() leaveProject$ = this.actions$
    .ofType(AuthActions.AUTH_LEAVE_PROJECT)
    .map(toPayload)
    .switchMap(({ project, user }) => this._auth.leaveProject(project, user)
      .map(user => ({ type: AuthActions.AUTH_LEAVE_PROJECT_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_LEAVE_PROJECT_FAIL, payload: error }))
    );
  
  // Member Teams
  @Effect() leaveTeam$ = this.actions$
    .ofType(AuthActions.AUTH_LEAVE_TEAM)
    .map(toPayload)
    .switchMap(({ team, user }) => this._auth.leaveTeam(team, user)
      .map(user => ({ type: AuthActions.AUTH_LEAVE_TEAM_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_LEAVE_TEAM_FAIL, payload: error }))
    );

  // Newsletter Effects
  @Effect() joinNewsletter$ = this.actions$
    .ofType(AuthActions.AUTH_JOIN_NEWSLETTER)
    .map(toPayload)
    .switchMap(({ newsletter, user }) => this._auth.joinNewsletter(newsletter, user)
      .map(user => ({ type: AuthActions.AUTH_JOIN_NEWSLETTER_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_JOIN_NEWSLETTER_FAIL, payload: error }))
    );

  @Effect() leaveNewsletter$ = this.actions$
    .ofType(AuthActions.AUTH_ADD_TO_PROJECT_ADMINS)
    .map(toPayload)
    .switchMap(({ newsletter, user }) => this._auth.leaveNewsletter(newsletter, user)
      .map(user => ({ type: AuthActions.AUTH_ADD_TO_PROJECT_ADMINS_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_ADD_TO_PROJECT_ADMINS_FAIL, payload: error }))
    );

  // Notification Effects
  @Effect() readNotification$ = this.actions$
    .ofType(AuthActions.AUTH_READ_NOTIFICATION)
    .map(toPayload)
    .switchMap(({ notification, user }) => this._auth.readNotification(notification, user)
      .map(user => ({ type: AuthActions.AUTH_READ_NOTIFICATION_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_READ_NOTIFICATION_FAIL, payload: error }))
    );

  @Effect() deleteNotification$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_NOTIFICATION)
    .map(toPayload)
    .switchMap(({ notification, user }) => this._auth.deleteNotification(notification, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_NOTIFICATION_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_NOTIFICATION_FAIL, payload: error }))
    );

  // Application Effects
  @Effect() createApplication$ = this.actions$
    .ofType(AuthActions.AUTH_CREATE_APPLICATION)
    .map(toPayload)
    .switchMap(({ application, user, project }) => this._auth.createApplication(application, user, project)
      .map(user => ({ type: AuthActions.AUTH_CREATE_APPLICATION_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_CREATE_APPLICATION_FAIL, payload: error }))
    );
  
  @Effect() updateApplication$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_APPLICATION)
    .map(toPayload)
    .switchMap(({ application, user }) => this._auth.updateApplication(application, user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_APPLICATION_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_APPLICATION_FAIL, payload: error }))
    );
  
  @Effect() deleteApplication$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_APPLICATION)
    .map(toPayload)
    .switchMap(({ application, user }) => this._auth.deleteApplication(application, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_APPLICATION_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_APPLICATION_FAIL, payload: error }))
    );

  // Chat Effects
  @Effect() createChat$ = this.actions$
    .ofType(AuthActions.AUTH_CREATE_CHAT)
    .map(toPayload)
    .switchMap(({ chat, user, userArray }) => this._auth.createChat(chat, user, userArray)
      .map(user => ({ type: AuthActions.AUTH_CREATE_CHAT_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_CREATE_CHAT_FAIL, payload: error }))
    );
  
  @Effect() updateChat$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_CHAT)
    .map(toPayload)
    .switchMap(({ chat, user }) => this._auth.updateChat(chat, user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_CHAT_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_CHAT_FAIL, payload: error }))
    );
  
  @Effect() deleteChat$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_CHAT)
    .map(toPayload)
    .switchMap(({ chat, user }) => this._auth.deleteChat(chat, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_CHAT_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_CHAT_FAIL, payload: error }))
    );

  // File Effects
  @Effect() createFile$ = this.actions$
    .ofType(AuthActions.AUTH_CREATE_FILE)
    .map(toPayload)
    .switchMap(({ file, user, project }) => this._auth.createFile(file, user, project)
      .map(user => ({ type: AuthActions.AUTH_CREATE_FILE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_CREATE_FILE_FAIL, payload: error }))
    );
  
  @Effect() updateFile$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_FILE)
    .map(toPayload)
    .switchMap(({ file, user }) => this._auth.updateFile(file, user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_FILE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_FILE_FAIL, payload: error }))
    );
  
  @Effect() deleteFile$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_FILE)
    .map(toPayload)
    .switchMap(({ file, user }) => this._auth.deleteFile(file, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_FILE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_FILE_FAIL, payload: error }))
    );

  // Message Effects
  @Effect() createMessage$ = this.actions$
    .ofType(AuthActions.AUTH_CREATE_MESSAGE)
    .map(toPayload)
    .switchMap(({ message, user,context }) => this._auth.createMessage(message, user, context)
      .map(user => ({ type: AuthActions.AUTH_CREATE_MESSAGE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_CREATE_MESSAGE_SUCCESS, payload: error }))
    );
  
  @Effect() updateMessage$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_MESSAGE)
    .map(toPayload)
    .switchMap(({ message, user }) => this._auth.updateMessage(message, user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_MESSAGE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_MESSAGE_FAIL, payload: error }))
    );
  
  @Effect() deleteMessage$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_MESSAGE)
    .map(toPayload)
    .switchMap(({ message, user }) => this._auth.deleteMessage(message, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_MESSAGE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_MESSAGE_SUCCESS, payload: error }))
    );

  // Milestone Effects
  @Effect() createMilestone$ = this.actions$
    .ofType(AuthActions.AUTH_CREATE_MILESTONE)
    .map(toPayload)
    .switchMap(({ milestone, user, project }) => this._auth.createMilestone(milestone, user, project)
      .map(user => ({ type: AuthActions.AUTH_CREATE_MILESTONE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_CREATE_MILESTONE_FAIL, payload: error }))
    );
  
  @Effect() updateMilestone$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_MILESTONE)
    .map(toPayload)
    .switchMap(({ milestone, user }) => this._auth.updateMilestone(milestone, user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_MILESTONE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_MILESTONE_FAIL, payload: error }))
    );
  
  @Effect() deleteMilestone$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_MILESTONE)
    .map(toPayload)
    .switchMap(({ milestone, user }) => this._auth.deleteMilestone(milestone, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_MILESTONE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_MILESTONE_FAIL, payload: error }))
    );

  // Post Effects
  @Effect() createPost$ = this.actions$
    .ofType(AuthActions.AUTH_CREATE_POST)
    .map(toPayload)
    .switchMap(({ post, user, context }) => this._auth.createPost(post, user, context)
      .map(user => ({ type: AuthActions.AUTH_CREATE_POST_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_CREATE_POST_FAIL, payload: error }))
    );
  
  @Effect() updatePost$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_POST)
    .map(toPayload)
    .switchMap(({ post, user }) => this._auth.updatePost(post, user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_POST_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_POST_FAIL, payload: error }))
    );
  
  @Effect() deletePost$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_POST)
    .map(toPayload)
    .switchMap(({ post, user }) => this._auth.deletePost(post, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_POST_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_POST_FAIL, payload: error }))
    );

  // Project Effects
  @Effect() createProject$ = this.actions$
    .ofType(AuthActions.AUTH_CREATE_PROJECT)
    .map(toPayload)
    .switchMap(({ project, user }) => this._auth.createProject(project, user)
      .map(user => ({ type: AuthActions.AUTH_CREATE_PROJECT_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_CREATE_PROJECT_FAIL, payload: error }))
    );
  
  @Effect() updateProject$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_PROJECT)
    .map(toPayload)
    .switchMap(({ project, user }) => this._auth.updateProject(project, user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_PROJECT_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_PROJECT_FAIL, payload: error }))
    );
  
  @Effect() deleteProject$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_PROJECT)
    .map(toPayload)
    .switchMap(({ project, user }) => this._auth.deleteProject(project, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_PROJECT_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_PROJECT_FAIL, payload: error }))
    );

  // Role Effects
  @Effect() createRole$ = this.actions$
    .ofType(AuthActions.AUTH_CREATE_ROLE)
    .map(toPayload)
    .switchMap(({ role, user, project }) => this._auth.createRole(role, user, project)
      .map(user => ({ type: AuthActions.AUTH_CREATE_ROLE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_CREATE_ROLE_FAIL, payload: error }))
    );
  
  @Effect() updateRole$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_ROLE)
    .map(toPayload)
    .switchMap(({ role, user }) => this._auth.updateRole(role, user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_ROLE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_ROLE_FAIL, payload: error }))
    );
  
  @Effect() deleteRole$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_ROLE)
    .map(toPayload)
    .switchMap(({ role, user }) => this._auth.deleteRole(role, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_ROLE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_ROLE_FAIL, payload: error }))
    );

  // Team Effects
  @Effect() createTeam$ = this.actions$
    .ofType(AuthActions.AUTH_CREATE_MILESTONE)
    .map(toPayload)
    .switchMap(({ milestone, user, project }) => this._auth.createMilestone(milestone, user, project)
      .map(user => ({ type: AuthActions.AUTH_CREATE_MILESTONE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_CREATE_MILESTONE_FAIL, payload: error }))
    );
  
  @Effect() updateMilestone$ = this.actions$
    .ofType(AuthActions.AUTH_UPDATE_MILESTONE)
    .map(toPayload)
    .switchMap(({ milestone, user }) => this._auth.updateMilestone(milestone, user)
      .map(user => ({ type: AuthActions.AUTH_UPDATE_MILESTONE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_UPDATE_MILESTONE_FAIL, payload: error }))
    );
  
  @Effect() deleteMilestone$ = this.actions$
    .ofType(AuthActions.AUTH_DELETE_MILESTONE)
    .map(toPayload)
    .switchMap(({ milestone, user }) => this._auth.deleteMilestone(milestone, user)
      .map(user => ({ type: AuthActions.AUTH_DELETE_MILESTONE_SUCCESS, payload: user }))
      .catch(error => Observable.of({ type: AuthActions.AUTH_DELETE_MILESTONE_FAIL, payload: error }))
    );
  
}
