<template>
  <div class="">
    <div className="flex flex-col ">
      <label htmlFor="" className="font-montserrat">
        Filter By Ingredient
      </label>
      <input
        type="text"
        placeholder="Ingredient Name"
        className="input"
        v-model="search"
        @click="toggle($event)"
      />
    </div>
    <div
      class="bg-white absolute z-10 max-h-52 w-52 overflow-y-scroll"
      v-if="isDropdownOpen"
    >
      <div
        class="flex items-center gap-2 p-2 hover:bg-red-50 cursor-pointer"
        v-for="(ingredient, index) in ingredients"
        :key="index"
        @click="handleSelect(ingredient)"
      >
        <img
          :src="ingredient.picture"
          class="w-10 h-10 rounded-full object-cover"
        />
        <h1 class="text-lg font-semibold">{{ ingredient.name }}</h1>
      </div>
    </div>
    <div class="my-3 flex flex-wrap -m-1 z-10">
      <!-- Selected Ingredents -->
      <div
        v-for="(selectIngredent, index) in selectedIngeredents"
        :key="index"
        class="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm border-[1px] rounded-full hover:border-orange-300 px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300"
      >
        {{ selectIngredent }}
        <button
          @click="removeTag(selectIngredent)"
          class="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3 h-3 sm:h-4 sm:w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import SearchIngredent from "~/graphql/queries/searchIngredent.gql";
import query from "~/composables/Query";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  error: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:modelValue",]);
const search = ref(props.modelValue?.name || "");
const selectedIngeredents = ref([]);

const selectIngridents = inject("selectIngridents");


watch(
  () => props.modelValue,
  (value) => {
    console.log("object", value.name);
    search.value = value?.name || "";
  }
);


const limit = ref(6);
const offset = ref(0);
const ingredients = ref([]);
const orderBy = ref([{ name: "asc" }]);
const isDropdownOpen = ref(false);
// const selectedIngeredent = ref("");

const filter = computed(() => {
  let query = {};
  if (search.value) {
    query.name = {
      _ilike: `%${search.value}%`,
    };
  }
  return query;
});

const { onResult, loading, onError, onDone } = query(
  filter,
  orderBy,
  limit,
  offset,
  SearchIngredent
);

onResult((result) => {
  ingredients.value = result.data.ingredients;
});

const toggle = (event) => {
  event.stopPropagation();
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleSelect = (ingredient) => {
  // selectedIngeredent.value = ingredient;
  if (
    selectedIngeredents.value.includes(ingredient.name) ||
    ingredient.value === ""
  ) {
    return;
  }
  search.value = "";
  isDropdownOpen.value = false;
  selectedIngeredents.value.push(ingredient.name);
  selectIngridents(selectedIngeredents.value)
  emit("update:modelValue", ingredient);
};

const removeTag = (name) => {
  selectedIngeredents.value = selectedIngeredents.value.filter(
    (t) => t !== name
  );
  selectIngridents(selectedIngeredents.value)

};
</script>
