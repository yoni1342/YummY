<template>
  <div v-if="!loading" class="flex flex-col items-center py-10 relative">
    <div class="text-primary font-quicksand text-5xl font-bold">
      Edit Recipe
    </div>
    <div class="flex justify-center gap-5 px-10 w-full">
      <!-- Left -->
      <div class="h-full">
        <div class="flex justify-between items-center gap-4 my-3">
          <!-- Recipe Title -->
          <div class="flex flex-col mt-6">
            <label htmlFor="" className="font-poppins font-montserrat">
              Recipie Title</label
            >
            <input
              class="input"
              placeholder="Past Shero"
              v-model="recipeTitle"
            />
          </div>

          <!-- Time Duration -->
          <div class="flex flex-col mt-6">
            <label htmlFor="" className="font-poppins font-montserrat">
              Time Duration</label
            >
            <input
              class="input"
              placeholder="30 min"
              v-model="recipeDuration"
            />
          </div>
        </div>
        <!-- Description of recipe -->
        <div class="flex flex-col mt-6">
          <label htmlFor="" className="font-poppins font-montserrat">
            Description</label
          >
          <textarea
            class="w-full input"
            placeholder="This recipe is about ...."
            v-model="recipeDescriprion"
          />
        </div>
        <!-- Category -->
        <div class="mt-6">
          <div>
            <p
              class="text-primary hover:underline cursor-pointer w-fit"
              @click="openCatModal = true"
            >
              Add New Category
            </p>
            <ModalAddCategory v-if="openCatModal" v-model="openCatModal" />
          </div>

          <div
            v-for="(category, index) in categories"
            class="flex items-end gap-2"
            :key="index"
          >
            <ComboboxCategory v-model="category.category" />

            <div v-if="categories.length - 1 == index" class="">
              <!-- Add Icon -->
              <Icon
                icon="zondicons:add-solid"
                class="w-8 h-8 text-primary/50 hover:text-primary cursor-pointer"
                @click="addNewCategoryField"
              />
            </div>
            <div v-else>
              <Icon
                icon="ic:round-delete"
                class="w-8 h-8 text-primary/50 hover:text-primary cursor-pointer"
                @click="removeCategoryField(index)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right -->
      <div class="flex flex-col items-center">
        <!--***********************************************Ingredent*************************************************************** -->
        <div>
          <div>
            <p
              class="text-primary hover:underline cursor-pointer w-fit"
              @click="openIngrModal = true"
            >
              Add New Ingredient
            </p>
            <ModalAddIngredient v-if="openIngrModal" v-model="openIngrModal" />
          </div>

          <div
            class="flex items-end gap-5"
            v-for="(ingredient, index) in ingredients"
            :key="index"
          >
            <!-- Ingredent Combo -->
            <ComboboxIngredient v-model="ingredient.ingredient" />

            <!-- Amount -->
            <div class="flex items-end gap-3">
              <div class="flex flex-col mt-6">
                <label htmlFor="" className="font-montserrat"> amount</label>
                <!-- {{ ingredient}} -->
                <input
                  type="number"
                  placeholder="1"
                  className="input w-20"
                  v-model="ingredient.amount"
                />
              </div>
            </div>
            <!-- Unit -->
            <ComboboxUnit class="" v-model="ingredient.unit" />
            <!-- Add or remove -->
            <div v-if="ingredients.length - 1 == index" class="">
              <!-- Add Icon -->
              <Icon
                icon="zondicons:add-solid"
                class="w-8 h-8 text-primary/50 hover:text-primary cursor-pointer"
                @click="addNewIngredientField"
              />
            </div>
            <div v-else>
              <Icon
                icon="ic:round-delete"
                class="w-8 h-8 text-primary/50 hover:text-primary cursor-pointer"
                @click="removeIngredientField(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white w-[60%]">
      <div class="font-montserrat">Write Steps:</div>
      <div class="flex items-end gap-2" v-for="(step, index) in steps">
        <div class="mt-6 w-[100%]">
          <label htmlFor="" className="font-montserrat">
            Step: {{ index + 1 }}
          </label>
          <textarea
            class="w-full input"
            placeholder="Describe the step"
            v-model="step.step_description"
          />
        </div>
        <!-- Add or remove -->
        <div v-if="steps.length - 1 == index" class="">
          <!-- Add Icon -->
          <Icon
            icon="zondicons:add-solid"
            class="w-8 h-8 text-primary/50 hover:text-primary cursor-pointer"
            @click="addNewStepField"
          />
        </div>
        <div v-else>
          <Icon
            icon="ic:round-delete"
            class="w-8 h-8 text-primary/50 hover:text-primary cursor-pointer"
            @click="removeStepField(index)"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-5 mt-10">
      <button class="btn btn-primary" @click="handleUpdate">Update</button>
      <button class="btn btn-secondary">Cancel</button>
    </div>
  </div>
  <div v-else>
    <ModalLoading message="loadind....." />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import Query from "~/composables/singleQuery";
import GetRecipeByIdQuery from "~/graphql/queries/getRecipesById.gql";
import Mutation from "~/composables/useAuthMutation";
import UpdateRecipeMutation from "~/graphql/mutations/update_recipe.gql";
const recipeTitle = ref("");
const recipeDuration = ref("");
const recipeDescriprion = ref("");
const categories = ref([]);
const openCatModal = ref(false);
const openIngrModal = ref(false);
const ingredients = ref([]);
const steps = ref([{ step_description: "" }]);
const route = useRoute();

// ******************************** Ingredients Logic ********************************
const addNewIngredientField = () => {
  console.log(ingredients.value);
  const lastIngredient = ingredients.value[ingredients.value.length - 1];
  if (
    lastIngredient.ingredient &&
    lastIngredient.amount &&
    lastIngredient.unit
  ) {
    ingredients.value.push({ ingredient: {}, amount: null, unit: null });
  }
};
const removeIngredientField = (index) => {
  // console.log("index", index, ingredients.value[index].ingredient);
  ingredients.value = ingredients.value.filter((_, i) => i !== index);
  console.log("index", index, ingredients.value[index].ingredient);
};
// ******************************** Steps Logic ********************************
const addNewStepField = () => {
  steps.value.push({ step_description: "" });
};
const removeStepField = (index) => {
  steps.value.splice(index, 1);
};
// ******************************** Category Logic ********************************
const addNewCategoryField = () => {
  // console.log(categories.value);
  const lastCategory = categories.value[categories.value.length - 1];
  if (lastCategory.category) {
    categories.value.push({ category: {} });
  }
  console.log("ccc", categories.value);
};
const removeCategoryField = (index) => {
  categories.value = categories.value.filter((_, i) => i !== index);
};
// ******************************** Query ********************************
const recipe_id = route.params.id;
const { onResult, loading, onError, refetch } = Query(
  recipe_id,
  GetRecipeByIdQuery
);
const info = ref({});
onResult((result) => {
  //   console.log("result", result);
  info.value = result.data.recipes_by_pk;
});

watch(info, (val) => {
  // console.log("info", val);
  recipeTitle.value = val.title;
  recipeDuration.value = val.preparation_time;
  recipeDescriprion.value = val.description;
  categories.value = val.recipe_categories.map((cat) => {
    return { category: cat.category };
  });
  ingredients.value = val.recipe_ingredients.map((ingr) => {
    return {
      ingredient: ingr.ingredient,
      amount: ingr.quantity,
      unit: ingr.unit,
    };
  });
  steps.value = val.stepes.map((step) => {
    return { step_description: step.step_description };
  });

  console.log("ii", info.value);
});

const {
  mutate: updateRecipe,
  loading: updateRecipeLoading,
  onDone: updateRecipeDone,
  onError: updateRecipeError,
} = Mutation(UpdateRecipeMutation);

const handleUpdate = () => {
  const recipe_ingredients = [];
  const recipe_catagories = [];
  const recipe_steps = [];

  ingredients.value.map((ingredient, index) => {
     console.log("sas",ingredient);
    recipe_ingredients.push({
      ingredient_id: ingredient.ingredient.ingredient_id,
      unit: ingredient.unit,
      quantity: ingredient.amount,
      recipe_id,
    });
  });
  categories.value.map((catagory) => {
    recipe_catagories.push({
      category_id: catagory.category.category_id,
      recipe_id,
    });
  });

  steps.value.map((step, index) => {
    recipe_steps.push({
      step_description: step.step_description,
      order: index + 1,
      recipe_id,
    });
  });
  console.log("ind",recipe_ingredients);
  updateRecipe({
    id: recipe_id,
    input: { description: recipeDescriprion.value },
    categories: recipe_catagories,
    ingredients: recipe_ingredients,
    steps: recipe_steps
  });
  updateRecipeDone((val)=>{
    refetch()
  })
};

definePageMeta({
  title: "Edit Recipe",
  description: "Admin",
  middleware: "auth",
  layout: "admin",
});
</script>
