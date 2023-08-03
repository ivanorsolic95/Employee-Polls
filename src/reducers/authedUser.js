import { LOGGED_IN, LOGGED_OUT } from "../actions/authedUser";

export function authedUser(state = null, action) {
  switch (action.type) {
    case LOGGED_IN:
      return action.authedUser;
    case LOGGED_OUT:
      return null;
    default:
      return state;
  }
}
