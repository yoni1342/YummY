<template>
  <div class="flex flex-col lg:flex-row items-center justify-between">
    <div class="flex-1 flex flex-col gap-4 px-8">
      <p class="header xl:text-[100px] xl:leading-[90px] capitalize">
        Choose from <br />thousands of <br />recipes
      </p>
      <p class="text-xl font-montserrat font-light">
        Appropriately integrate technically sound value with scalable
        infomediaries negotiate sustainable strategic theme areas
      </p>
      <div class="btn w-fit">
        Sign up for free
      </div>
    </div>
    <div class="flex-1">
      <img :src="hero" class="lg:w-[800px]" />
    </div>
  </div>
</template>

<script setup>
import { hero } from "~/assets/images";
</script>
