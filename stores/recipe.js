import { defineStore } from "pinia";
// import {useLocalStorage} from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    recipe: {
        
    }
  }),
  getters: {
    getRecipe(){
        return this.recipe
    }

  },
  actions: {
    setUser(user) {
      this.user = user;
    },
  },
  persist: true,
});
