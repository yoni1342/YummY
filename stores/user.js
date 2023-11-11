import { defineStore } from "pinia";
import Cookies from "js-cookie";
const userToken = Cookies.get("auth_token");

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  getters: {
    getUser() {
      return this.user;
    },
    isAuthenticated: (state) => !!state.user.accessToken,
  },
  actions: {
    setUser(user) {
      this.user = user;
      if (userToken) {
        this.user.accessToken = userToken;
      }
    },
    logOut() {
      this.user = {};
      Cookies.remove("auth_token");
    },
  },
  persist: true,
});
