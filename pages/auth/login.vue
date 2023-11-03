<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="w-96 flex flex-col gap-3 my-5 px-8">
      <!-- Email -->
      <div class="flex flex-col items-start">
        <label for="email" class="text-xs md:text-sm">Email</label>
        <input
          type="email"
          name="email"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-2xl"
          v-model="email"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col items-start">
        <label for="password" class="text-xs md:text-sm">Password</label>
        <input
          type="password"
          name="password"
          class="bg-primary/5 font-montserrat outline-none rounded-2xl p-3 w-full"
          v-model="password"
        />
      </div>
      <button class="btn" @click="login">Login</button>
    </div>

    <div>
      <p class="text-xs md:text-sm">
        Don't have an account?
        <nuxt-link
          to="register"
          class="text-blue-500 cursor-pointer hover:underline"
          >Register</nuxt-link
        >
      </p>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { SignInMutation } from "~/graphql/auth.graphql";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
import { useUserStore } from "~/stores/user";


const { mutate, onDone, loading, onError } = useAuth(SignInMutation);
const email = ref("");
const password = ref("");
const userStore = useUserStore(); 


const login = () => {
  // if (v$.value.$invalid) {
  //   toast.error("Please fill all the fields", {
  //     transition: toast.TRANSITIONS.FLIP,
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  //   return;
  // }

  const input = {
    email: email.value,
    password: password.value,
  };
  console.log(input);
  mutate(input);
};
onDone((result) => {
  toast.success("user loggedin", {
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
  Cookies.set("auth_token", result.data.signIn.data.accessToken, {
    expires: 7,
  });
  const data = result.data.signIn.data;
  // console.log(data)
  userStore.setUser(data);
  navigateTo("/admin", { replace: true });
});

onError((error) => {
  toast.error(error.message, {
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
});

definePageMeta({
  title: "Login",
  description: "Login to your account",
  layout: "auth",
});
</script>
