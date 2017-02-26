import { ActionReducer, Action } from '@ngrx/store';

import { AuthActions } from '../actions/';

export interface AuthState {
  id?: String,
  adminProjects?: Object[],
  adminTasks?: Object[],
  adminTeams?: Object[],
  applications?: Object[],
  assignedTasks?: Object[],
  authoredPosts?: Object[],
  avatarUrl?: String,
  picture?: String,
  bannerUrl?: String,
  chats?: Object[],
  createdAt?: Date,
  desc?: String,
  email: String,
  emailConfirm?: Boolean,
  email_verified?: Boolean,
  facebookUrl?: String,
  files?: Object[],
  followedProject?: Object[],
  githubUrl?: String,
  googleUrl?: String,
  linkedinUrl?: String,
  messages?: Object[],
  milestones?: Object[],
  name?: String,
  newsletterSubs?: String[],
  notifications?: Object[],
  posts?: Object[],
  roles?: Object[],
  slug?: Object,
  teams?: Object[],
  twitterUrl?: String,
  updatedAt?: Date,
  username?: String,
  nickname?: String
}


export const authReducer: ActionReducer<AuthState> = (state, action: Action) => {
  switch (action.type) {
    case AuthActions.AUTH_LOGIN_USER_SUCCESS: {
      return Object.assign({}, state, {
        id: action.payload.id,
        avatarUrl: action.payload.avatarUrl,
        chats: action.payload.chats,
        email: action.payload.email,
        emailConfirm: action.payload.emailConfirm,
        followedProject: action.payload.followedProjects,
        messages: action.payload.messages,
        name: action.payload.name,
        notifications: action.payload.notifications,
        username: action.payload.username
      });
    }

    case AuthActions.AUTH_SIGNUP_USER_SUCCESS: {
      return Object.assign({}, state, {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName
      });
    }

    case AuthActions.AUTH_UPDATE_PROFILE_SUCCESS: {
      return Object.assign({}, state, {
        avatarUrl: action.payload.avatarUrl,
        bannerUrl: action.payload.bannerUrl,
        desc: action.payload.desc,
        facebookUrl: action.payload.facebookUrl,
        githubUrl: action.payload.githubUrl,
        googleUrl: action.payload.googleUrl,
        linkedinUrl: action.payload.linkedinUrl,
        name: action.payload.name,
        newsletterSubs: action.payload.newsletterSubs,
        slug: action.payload.slug,
        twitterUrl: action.payload.twitterurl,
        username: action.payload.username
      });
    }

    default: {
      return state;
    }
  }
};