<template>
  <div class="flex flex-col gap-5">
    <!-- header -->
    <div class="flex gap-3 items-center">
      <!-- image -->
      <div>
        <NuxtImg
          src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
          height="50"
          class="w-20 h-20 object-cover rounded-full"
        />
      </div>
      <div>
        <p class="text-xl font-montserrat">Alice Thomson</p>
        <p class="text-sm font-light font-montserrat text-gray-400">
          12 days ago
        </p>
        <div class="flex">
          <Icon icon="solar:star-bold" class="text-yellow-400" />
          <Icon icon="solar:star-bold" class="text-yellow-400" />
          <Icon icon="solar:star-bold" class="text-yellow-400" />
          <Icon icon="solar:star-bold" class="text-yellow-400" />
          <Icon icon="solar:star-bold" class="text-gray-400" />
        </div>
      </div>
    </div>
    <!-- Commenr -->
    <div class="font-montserrat text-justify">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
    </div>
  </div>
</template>

<script setup>
import { person } from "~/assets/images";
import { Icon } from "@iconify/vue";
</script>
