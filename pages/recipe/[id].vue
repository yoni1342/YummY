<template>
  <div>
    <div class="px-[30px] py-3">
      <Nav />
    </div>
    <div class="container">
      <div class="lg:flex">
        <!-- Picture -->
        <div class="p-3 lg:flex-1">
          <img :src="recipe1" class="rounded-2xl object-cover" />
        </div>
        <!-- Descriptions -->
        <div class="p-3 flex flex-col items-center lg:flex-1">
          <div class="flex flex-col gap-3">
            <h2 class="text-4xl lg:text-6xl font-quicksand font-semibold">
              White calzones with marinara sauce
            </h2>
            <p class="font-montserrat mt-4 text-gray-800">
              Supermarket brands of ricotta contain stabilizers, which can give
              the cheese a gummy texture when baked. Check the label and choose
              ricotta made with as few ingredients as possible.
            </p>
          </div>

          <div class="flex p-4 items-center justify-between w-full">
            <div class="flex flex-col items-center font-light">
              <Icon icon="carbon:time" class="w-4 h-4" />
              <p class="font-montserrat text-gray-500 text-sm">Total Time</p>
              <p class="font-montserrat text-gray-500 text-xs">50 mins</p>
            </div>
            <div class="text-sm font-montserrat font-light">
              <p class="hover:text-primary cursor-pointer">
                Created by Alex Willams
              </p>
              <p>21 recipes</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Steps -->
      <div>
        <div>
          <RecipeBody />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { recipe1 } from "~/assets/images";
import { Icon } from "@iconify/vue";
</script>
