<template>
  <div class="flex flex-col gap-4 items-center">
    <form @submit.prevent="login" class="w-96 flex flex-col gap-3 my-5 px-8">
      <!-- Email -->
      <div class="flex flex-col items-start">
        <label for="email" class="text-xs md:text-sm">Email</label>
        <span class="text-red-500">{{ errors.email }}</span>
        <input
          type="email"
          name="email"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-2xl"
          v-bind="email"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col items-start">
        <label for="password" class="text-xs md:text-sm">Password</label>
        <span class="text-red-500">{{ errors.password }}</span>
        <input
          type="password"
          name="password"
          class="bg-primary/5 font-montserrat outline-none rounded-2xl p-3 w-full"
          v-bind="password"
        />
      </div>
      <button class="btn" type="submit">Login</button>
    </form>

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
import * as yup from "yup";

const { defineInputBinds, handleSubmit, errors, setFieldError } = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  }),
});

const { mutate, onDone, loading, onError } = useAuth(SignInMutation);
const email = defineInputBinds("email");
const password = defineInputBinds("password");
const userStore = useUserStore();


const login = handleSubmit((values, { setFieldError }) => {

  const input = {
    email: values.email,
    password: values.password,
  };
  mutate(input);
});

onDone((result) => {
  toast.success("user loggedin", {
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
  Cookies.set("auth_token", result.data.signIn.data.accessToken, {
    expires: 7,
  });
  const data = result.data.signIn.data;
  console.log(data);
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
