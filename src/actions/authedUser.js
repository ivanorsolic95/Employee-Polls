export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";

export function login(authedUser) {
  return {
    type: LOGGED_IN,
    authedUser,
  };
}

export function logout() {
  return { type: LOGGED_OUT };
}

export const handleLogin = (username, password) => {
  return async (dispatch, getState) => {
    const { users } = getState();

    for (let user in users) {
      if (users[user].id === username && users[user].password === password) {
        dispatch(login(user));
        return true;
      }
    }
    return false;
  };
};

export function handleLogout() {
  return (dispatch) => {
    dispatch(logout());
  };
}
