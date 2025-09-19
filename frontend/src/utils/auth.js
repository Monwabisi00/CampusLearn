const authTokenKey = "campus-learn-token";
const authUserKey = "campus-learn-user";

export const authUtils = {
  setToken: (token) => {
    localStorage.setItem(authTokenKey, token);
  },
  getToken: () => {
    return localStorage.getItem(authTokenKey);
  },
  removeToken: () => {
    localStorage.removeItem(authTokenKey);
  },
  setUser: (user) => {
    localStorage.setItem(authUserKey, user);
  },
  getUser: () => {
    return localStorage.getItem(authUserKey);
  },
  removeUser: () => {
    localStorage.removeItem(authUserKey);
  },
};
