<template>
  <div class="">
    <div className="flex flex-col mt-6">
      <label htmlFor="" className="font-montserrat">
        Search Ingredient
      </label>
      <input
        type="text"
        placeholder="Ingredient Name"
        className="input"
        v-model="search"
        @click="toggle($event)"
      />
    </div>
    <div class="bg-white absolute max-h-52 w-52 overflow-y-scroll" v-if="isDropdownOpen">
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
// console.log("object", props.modelValue?.name);
const search = computed(() => {
  return props.modelValue?.name|| "";
});

const limit = ref(6);
const offset = ref(0);
const ingredients = ref([]);
const orderBy = ref([{ name: "asc" }]);
const isDropdownOpen = ref(false);
const selectedIngeredent = ref("");

const emit = defineEmits(["update:modelValue"]);

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
  selectedIngeredent.value = ingredient;
  search.value = ingredient.name;
  isDropdownOpen.value = false;
  emit("update:modelValue", ingredient);
};
</script>
