<template>
  <div class="px-[30px] py-3">
    <Nav />
  </div>
  <div class="container">
    <Hero />
    <div class="flex items-start">
      <!-- <div class="flex-[30%]"> -->
        <!-- <Filter /> -->
      <!-- </div> -->
      <div class="flex-[70%]">
        <RecipeCardList />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "~/stores/user.js";
const userStore = useUserStore();
</script>

<style></style>
