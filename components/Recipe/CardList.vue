<template>
  <div
    class=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center"
  >
    <RecipeCard
      v-for="(recipe, index) in recipes"
      :key="index"
      :recipe="recipe"
      :isAdmin="isAdmin"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  recipes: {
    type: Array,
    default: () => ({}),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

console.log("recipes", props.recipes);
</script>
