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
        <RecipeCardList v-model:recipes="recipes" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { useUserStore } from "~/stores/user.js";
import Query from "~/composables/Query.js";
import GetRecipes from "~/graphql/queries/getRecipes.gql";
const userStore = useUserStore();
const limit = ref(6);
const offset = ref(0);
const orderBy = ref([{ created_at: "desc" }]);
const filter = ref({});
const recipes = ref([]);

watch(recipes, (val)=>{
  console.log("recipes", val);
})
const { onResult, loading, onError, refetch } = Query(
  filter,
  orderBy,
  limit,
  offset,
  GetRecipes
);
onResult((result) => {
  // console.log("result", result);
  recipes.value = result.data.recipes;
});

onError((error) => {
  console.log("error", error);
});
</script>

<style></style>
