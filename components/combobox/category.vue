<template>
  <div class="relative">
    <div className="flex  flex-col ">
      <label htmlFor="" className="font-montserrat"> Search Catagories </label>
      <input
        type="text"
        placeholder="Ingredient Name"
        className=" input"
        v-model="search"
        @click="toggle($event)"
      />
    </div>
    <div
      class="bg-white shadow-xl absolute max-h-52 w-52 overflow-y-scroll"
      v-if="isDropdownOpen"
    >
      <div
        class=" flex items-center gap-2 p-2 hover:bg-red-50 cursor-pointer"
        v-for="(catgory, index) in categories"
        :key="index"
        @click="handleSelect(catgory)"
      >
        <h1 class="text-lg font-semibold">{{ catgory.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import query from "~/composables/Query";  
import SearchCategory from "~/graphql/queries/searchCategory.gql";
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

const search = ref(props.modelValue?.name || "")
// watch(() => props.modelValue, (value) => {
//   search.value = value?.name || "";
// });

const emit = defineEmits(["update:modelValue"]);
const limit = ref(6);
const offset = ref(0);
const categories = ref([]);
const orderBy = ref([{ name: "asc" }]);
const isDropdownOpen = ref(false);
const selectedCategory = ref("");

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
  SearchCategory
);

onResult((result) => {
  console.log(result.data);
  categories.value = result.data.categories;
});

const toggle = ()=>{
  isDropdownOpen.value = !isDropdownOpen.value;
}

const handleSelect = (catgory) => {
  search.value = catgory.name;
  isDropdownOpen.value = false;
  emit("update:modelValue", catgory);  
};
</script>
