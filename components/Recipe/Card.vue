<template>
  <div class="w-fit">
    <div class="relative group cursor-pointer">
      <img
        :src="recipe1"
        alt="Recipe Image"
        class="rounded-2xl w-[350px] h-[200px] object-cover"
      />
      <div class="bg-black/30 absolute top-0 w-full h-full rounded-2xl hidden group-hover:block" />
      <Icon
        icon="material-symbols:bookmark"
        class="absolute top-0 right-2 w-8 h-8 text-white hover:text-primary cursor-pointer hover:scale-90 ease-in-out transition-transform duration-150"
      />
    </div>
    <div class="flex flex-col gap-3 my-3">
      <!-- Top -->
      <div>
        <h3 class="font-quicksand font-semibold">
          White calzones with marinara sauce
        </h3>
      </div>
      <!-- Buttom -->
      <div class="flex items-center justify-between text-sm">
        <!-- star -->
        <div class="flex items-center gap-3">
          <Icon icon="solar:star-bold" class="text-yellow-400" />
          <p class="font-montserrat font-light text-gray-500">5.0(524)</p>
        </div>

        <!-- Creator -->
        <div class="font-montserrat text-gray-500 font-light cursor-pointer hover:text-primary">
          <p>by Aleaxa Dorchar</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { recipe1 } from "~/assets/images";
import { Icon } from "@iconify/vue";
</script>
