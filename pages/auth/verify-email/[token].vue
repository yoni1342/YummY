<template>
  <div>
    <div v-if="!erro.found" class="flex flex-col items-center justify-center">
      <div class="w-[500px]">
        <Vue3Lottie
          animationLink="https://lottie.host/cc9bde9b-74cd-4c58-b8e4-b217fda85892/Q8RlOvJYGi.json"
        />
      </div>
      <div class="flex flex-col items-center gap-2 px-3">
        <div class="text-center text-4xl font-quicksand text-primary">
          We Verify Your Email
        </div>
        <div class="text-sm font-montserrat"></div>
      </div>
      <div class="flex flex-col lg:flex-row gap-3">
        <button class="bg-primary text-white px-5 py-2 rounded-md mt-5">
          <a href="/auth/login">Login</a>
        </button>
      </div>
    </div>
    <div v-if="erro.found" class="flex flex-col items-center justify-center">
      <div class="w-[500px]">
        <Vue3Lottie
          animationLink="https://lottie.host/8fca3061-e4b1-4644-a572-6dcf3ad53b9d/rhu2nEPwaf.json"
        />
      </div>
      <div class="flex flex-col items-center gap-2 px-3">
        <div class="text-center text-4xl font-quicksand text-primary">
          {{erro.message}}
        </div>
        <div class="text-sm font-montserrat"></div>
      </div>
      <div class="flex flex-col lg:flex-row gap-3">
      </div>
    </div>
  </div>
</template>

<script setup>
const erro = ref({
  message: "",
  found: false,
});

const route = useRoute();
const router = useRouter();
const token = route.params.token;
console.log(token);

const mutation = gql`
  mutation MyMutation($tokenn: String!) {
    verifyEmail(arg1: { token: $tokenn }) {
      message
      success
    }
  }
`;

const { mutate } = useMutation(mutation);

// const verifyEmail = () => {

// };

onMounted(() => {
  const variables = {
    tokenn: token,
  };

  mutate(variables)
    .then((result) => {
      if (result.data.verifyEmail.success) {
        console.log(result);
      }
    })
    .catch((error) => {
      erro.value = {
        message: error.message,
        found: true,
      };
      console.log(erro.value.message);
    });
});

const login = () => {
  navigateTo("/auth/login", { replace: true });
};
</script>
