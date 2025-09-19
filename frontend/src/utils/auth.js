export const authUtils = {
  setToken: (token) => {
    localStorage.setItem("campus-learn-token", token);
  },
  getToken: () => {
    return localStorage.getItem("campus-learn-token");
  },
  removeToken: () => {
    localStorage.removeItem("campus-learn-token");
  },
  setUser: (user) => {
    localStorage.setItem("campus-learn-user", user);
  },
  getUser: () => {
    return localStorage.getItem("campus-learn-user");
  },
  removeUser: () => {
    localStorage.removeItem("campus-learn-user");
  },
};
