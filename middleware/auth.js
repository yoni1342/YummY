import { defineNuxtRouteMiddleware } from "nuxt/app";
import { useUserStore } from "~/stores/user.js";

export default defineNuxtRouteMiddleware((to, from, next) => {
  const userStore = useUserStore();
  
  if (userStore.isAuthenticated){
    return
  }else{
    return navigateTo("/auth/login")
  }
});
