<template>
  <div class="px-[30px] py-3">
    <Nav />
  </div>
  <div class="container">
    <div class="flex items-start gap-10">
      <div class="flex-[20%] flex flex-col justify-center">
        <!-- *******************************Search****************************** -->
        <div class="relative">
          <div
            class="flex items-center rounded-xl border-[1px] border-primary hover:bg-primary/20 px-2 py-1"
          >
            <div
              class="px-2 py-1 rounded-xl flex items-center gap-1 hover:bg-white/50 cursor-pointer"
            >
              <div class="">
                <Icon icon="carbon:search" class="text-black" />
              </div>
              <input
                placeholder="Search"
                class="outline-none ` px-2 bg-primary/0 group-hover:bg-white/50"
                v-model="search"
              />
            </div>
          </div>
        </div>

        <!-- *********************************Filter by duration ************************* -->
        <div class="my-4">
          <div>Filter By Duration</div>
          <div class="lg:max-w-[15rem] w-full">
            <VueSlider
              v-model="filterValue.duration_range"
              width="100%"
              height="10px"
              :min="0"
              :max="100"
              :dot-handle="{ background: '#009688' }"
              :tooltipStyle="{ backgroundColor: 'black' }"
              :dot-style="{
                background: '#fff',
                border: '4px solid #FB923C',
                width: '16px',
                height: '16px',
                top: '8px',
                padding: '1px',
              }"
              :railStyle="{ background: '#ffffff', height: '7px' }"
              :processStyle="{ background: '#eb4b36', height: '7px' }"
            >
            </VueSlider>
            <div class="flex justify-between space-x-2">
              <p class="text-grayText dark:text-darkGrayText text-sm">
                {{ filterValue.duration_range[0] }} min
              </p>
              <p class="text-grayText dark:text-darkGrayText text-sm">
                {{ filterValue.duration_range[1] }} min
              </p>
            </div>
          </div>
        </div>
        <!-- *****************************Filter by Ingredent**************************** -->
        <div class="relative">
          <FilterIngredent />
        </div>

        <!-- *****************************Filter by catagory**************************** -->
        <div class="relative">
          <FilterCatagory />
        </div>
      </div>

      <div class="flex-[80%]">
        <RecipeCardList v-model:recipes="recipes" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "~/stores/user.js";
import { Icon } from "@iconify/vue";
import Query from "~/composables/Query.js";
import GetRecipes from "~/graphql/queries/getRecipes.gql";
import { reactive, toRefs } from "vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

const userStore = useUserStore();
const limit = ref(6);
const offset = ref(0);
const orderBy = ref([{ created_at: "desc" }]);

const recipes = ref([]);
const search = ref("");
const categories = ref([]);
const ingredients = ref([]);
const order = ref(null);
const filterValue = ref({
  duration_range: [0, 100],
});


provide("selectIngridents", (selectedIngeredents) => {
  // console.log("selected ");
  ingredients.value = selectedIngeredents;
});
provide("selectCategory", (selectedCategories) => {
  categories.value = selectedCategories;
});
const filter = computed(() => {
  let query = {};
  query._and = [];

  if (search.value) {
    const titleCondition = {
      title: { _ilike: `%${search.value}%` },
    };

    const userCondition = {
      user: {
        first_name: { _ilike: `%${search.value}%` },
      },
    };

    let _or = [titleCondition, userCondition];

    query._and.push({ _or });
  }

  if (ingredients.value) {
    let ingds = [];
    ingredients.value.map((ingerdent) => {
      ingds.push({
        recipe_ingredients: {
          ingredient: {
            name: { _eq: ingerdent },
          },
        },
      });
    });
    query._and.push({ _and: ingds });
  }

  if (categories.value) {
    let cate = [];
    categories.value.map((category) => {
      cate.push({
        recipe_categories: {
          category: {
            name: {
              _eq: category,
            },
          },
        },
      });
    });
    query._and.push({ _and: cate });
  }

  query._and.push({
    preparation_time: {
      _gte: filterValue.value.duration_range[0],
      _lte: filterValue.value.duration_range[1],
    },
  });

  return query;
});

const { onResult, loading, onError, refetch } = Query(
  filter,
  orderBy,
  limit,
  offset,
  GetRecipes
);
onResult((result) => {
  console.log("result", result);
  recipes.value = result.data.recipes;
});

onError((error) => {
  // console.log("error", error);
});
</script>
