<template>
  <div v-if="recipes.length > 0" class="relative h-full">
    <RecipeCardList :recipes="recipes" isAdmin=true />
  </div>
  <div v-else>
    <div class="flex flex-col items-center justify-center w-full h-full">
      <div class="flex flex-col gap-5 items-center justify-center w-full h-full">
        <Icon icon="mdi:food-drumstick" class="w-24 h-24 text-red-500" />
        <h2 class="text-2xl font-semibold mt-4 capitalize">
          You have not created any recipe yet
        </h2>
        <p class="text-gray-500 mt-2">
          Click the button below to create your first recipe
        </p>
        <div>
          <nuxt-link to="/admin/create-recipe" class="btn w-fit">
            Create Recipe
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Query from "~/composables/Query";
import {Icon} from "@iconify/vue"
import GetRecipesQuery from "~/graphql/queries/getRecipes.gql";
const userStore = useUserStore();
const filter = ref({ user_id: { _eq: userStore.user.id } });
const recipes = ref([]);
const { onResult, loading, refetch, onError } = Query(
  filter,
  {},
  1000,
  0,
  GetRecipesQuery
);

onResult((result) => {
  recipes.value = result.data.recipes;
});

definePageMeta({
  title: "Recipes",
  description: "Admin",
  middleware: "auth",
  layout: "admin",
});
</script>
