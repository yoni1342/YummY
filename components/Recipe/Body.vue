<template>
  <div class="px-[30px]">
    <div class="lg:grid grid-cols-2 place-items-start gap-10">
      <!-- Steps -->

      <div class="flex-1">
        <Step :steps="steps" />
        <Comment :reviews="reviews"/>
      </div>
      <div class="flex-1">
        <!-- Ingredients -->
        <div>
          <h2 class="text-2xl font-quicksand font-semibold">Ingredients</h2>
          <Ingredients v-for="(ingredent, index) in ingredients" :key="index" :ingredent="ingredent"/>
        </div>

        <!-- Categories -->
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl font-quicksand font-semibold">Catagories</h2>
          <div class="flex gap-2 flex-wrap">
            <Tag v-for="(catagory, index) in catagories" :key="index" :tag="catagory.category.name" />
          </div>
        </div>
        <!-- Share -->
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl font-quicksand font-semibold">Share Recipe</h2>
          <div>
            <ShareSocialMeadia />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  const props = defineProps({
    steps: {
      type: Array,
      default: () => ({}),
    },
    ingredients: {
      type: Array,
      default: () => ({}),
    },
    catagories: {
      type: Array,
      default: () => ({}),
    },
    reviews: {
      type: Array,
      default: () => ({}),
    },
  })
</script>
