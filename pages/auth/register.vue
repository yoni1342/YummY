<template>
  <div class="flex flex-col gap-4 items-center">
    <div class="w-96 flex flex-col gap-3 px-8">
      <div class="flex flex-col items-start">
        <label for="first-name" class="text-xs md:text-sm font-montserrat"
          >First Name</label
        >
        <input
          type="text"
          name="first-name"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          v-model="first_name"
        />
      </div>
      <div class="flex flex-col items-start">
        <label for="last-name" class="text-xs md:text-sm font-montserrat"
          >Last Name</label
        >
        <input
          type="text"
          name="last-name"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          v-model="last_name"
        />
      </div>
      <div class="flex flex-col items-start">
        <label for="email" class="text-xs md:text-sm font-montserrat"
          >Email</label
        >
        <input
          type="email"
          name="email"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          v-model="email"
        />
      </div>
      <div class="flex flex-col items-start">
        <label for="password" class="text-xs md:text-sm font-montserrat"
          >Password</label
        >
        <input
          type="password"
          name="password"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          v-model="password"
        />
      </div>
      <div class="flex flex-col items-start">
        <label for="confirm-password" class="text-xs md:text-sm font-montserrat"
          >Confirm Password</label
        >
        <input
          type="password"
          name="confirm-password"
          class="bg-primary/5 font-montserrat outline-none p-3 w-full rounded-xl"
          v-model="confirmPassword"
        />
      </div>
      <button class="btn" @click="signup">Register</button>
    </div>

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

const router = useRouter();
const email = ref("");
const first_name = ref("");
const last_name = ref("");
const password = ref("");
const confirmPassword = ref("");

const { mutate, loading } = useMutation(SignOutMutation);

const signup = () => {
  const variables = {
    email: email.value,
    first_name: first_name.value,
    last_name: last_name.value,
    password: password.value,
  };

  mutate(variables)
    .then((result) => {
      if (result.data.signup.success) {
        console.log(result);
        router.push("/auth/verify-email");
      }
    })
    .catch((error) => {
      err.value.message = error.message;
      toast.error(error.message);
    });
};

definePageMeta({
  title: "Register",
  description: "Register to your account",
  layout: "auth",
});
</script>
