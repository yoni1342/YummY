import { defineStore } from "pinia";
// import {useLocalStorage} from "@vueuse/core";

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
    },
  },
  persist: true,
});
