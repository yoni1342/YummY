<template>
  <div>
    <div class="lg:flex items-center justify-between lg:px-20 lg:py-20">
      <div class="lg:flex-[50%] text-center flex flex-col gap-5">
        <!-- headding text -->
        <div class="">
          <div class="">
            <h1
              class="text-[50px] lg:text-[100px] font-quicksand font-bold text-primary"
            >
              Welcome
            </h1>
          </div>
        </div>

        <div>
          <slot />
        </div>
      </div>

      <div class="hidden lg:flex lg:flex-[50%]">
        <Vue3Lottie
          animationLink="https://lottie.host/cb2f4dd8-3a1f-419b-8387-748adeec8dbe/XUXcsIdX4Z.json"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { loginLottie } from "~/assets/animations";
</script>
