import { ActionReducer, Action } from '@ngrx/store';

import { ApplicationActions } from './application.actions';

export interface ApplicationState {
  _id: string;
  project: string;
  author: string;
  title: string;
  body: string;
  created: string;
  updated: string;
  links: string[];
  open: boolean;
}

const initialState: ApplicationState = {
  _id: '0',
  project: '0',
  author: '0',
  title: 'New Application',
  body: 'New application body.',
  created: '1486209016000',
  updated: '1486209016000',
  links: [],
  open: true
};

export const applicationReducer: ActionReducer<ApplicationState> = (state = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_APPLICATION": {
      return Object.assign({}, state, { name: action.payload });
    }

    default: {
      return state;
    }
  }
};
