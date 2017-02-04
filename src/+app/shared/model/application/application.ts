export const application = (state = [], action) => {
  switch(action.type) {
    case "ADD_APPLICATION":
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}

export class Application {
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
