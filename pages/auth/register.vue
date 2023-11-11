<template>
  <div class="flex flex-col gap-4 items-center">
    <form @submit.prevent="signup" class="w-96 flex flex-col gap-3 px-8">
      <div class="flex flex-col items-start">
        <label for="first-name" class="text-xs md:text-sm font-montserrat"
          >First Name</label
        >
        <span class="text-red-500">{{ errors.first_name }}</span>
        <input
          type="text"
          name="first-name"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          :class="[errors.first_name ? 'border-[1px] border-red-500' : '']"
          v-bind="first_name"
        />
      </div>
      <div class="flex flex-col items-start">
        <span class="text-red-500">{{ errors.last_name }}</span>
        <label for="last-name" class="text-xs md:text-sm font-montserrat"
          >Last Name</label
        >
        <input
          type="text"
          name="last-name"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          :class="[errors.last_name ? 'border-[1px] border-red-500' : '']"
          v-bind="last_name"
        />
      </div>
      <div class="flex flex-col items-start">
        <span class="text-red-500">{{ errors.email }}</span>
        <label for="email" class="text-xs md:text-sm font-montserrat"
          >Email</label
        >
        <input
          type="email"
          name="email"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          :class="[errors.email ? 'border-[1px] border-red-500' : '']"
          v-bind="email"
        />
      </div>
      <div class="flex flex-col items-start">
        <span class="text-red-500">{{ errors.password }}</span>
        <label for="password" class="text-xs md:text-sm font-montserrat"
          >Password</label
        >
        <input
          type="password"
          name="password"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          :class="[errors.password ? 'border-[1px] border-red-500' : '']"
          v-bind="password"
        />
      </div>
      <div class="flex flex-col items-start">
        <span class="text-red-500">{{ errors.confirmPassword }}</span>
        <label for="confirm-password" class="text-xs md:text-sm font-montserrat"
          >Confirm Password</label
        >
        <input
          type="password"
          name="confirm-password"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          :class="[errors.confirmPassword ? 'border-[1px] border-red-500' : '']"
          v-bind="confirmPassword"
        />
      </div>
      <button
        :class="{ 'opacity-50': loading }"
        :disabled="loading"
        type="submit"
        class="btn"
      >
        {{ loading ? "Registering" : "Register" }}
      </button>
    </form>

    <div>
      <p class="text-xs md:text-sm font-montserrat">
        Already have an account?
        <nuxt-link
          to="login"
          class="text-blue-500 cursor-pointer hover:underline"
          >Login</nuxt-link
        >
      </p>
    </div>
  </div>
</template>
<script setup>
import { SignOutMutation } from "~/graphql/auth.graphql";
import { toast } from "vue3-toastify";
import * as yup from "yup";

// import {useForm} from "@vee-validate/nuxt"

const { defineInputBinds, handleSubmit, errors, setFieldError } = useForm({
  validationSchema: yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  }),
});

const router = useRouter();
const email = defineInputBinds("email");
const first_name = defineInputBinds("first_name");
const last_name = defineInputBinds("last_name");
const password = defineInputBinds("password");
const confirmPassword = defineInputBinds("confirmPassword");

const { mutate, loading, onDone, onError } = useMutation(SignOutMutation);

const signup = handleSubmit((values, { setFieldError }) => {
  const input = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };
  mutate(input);
});

onDone((result) => {
  if (result.data.signup.success) {
    console.log(result);
    router.push("/auth/verify-email");
  }
});
onError((error) => {
  toast.error("Something went wrong", {
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
});

definePageMeta({
  title: "Register",
  description: "Register to your account",
  layout: "auth",
});
</script>
