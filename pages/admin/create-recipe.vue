<template>
  <div class="flex flex-col items-center py-10">
    <div class="text-primary font-quicksand text-5xl font-bold">Add Recipe</div>
    <div class="flex justify-center gap-5 px-10 w-full">
      <!-- Left -->
      <div class="h-full">
        <div class="flex justify-between items-center gap-4 my-3">
          <!-- Recipe Title -->
          <div class="flex flex-col mt-6">
            <label htmlFor="" className="font-poppins font-montserrat">
              Recipie Title</label
            >
            <input class="input" placeholder="Past Shero" />
          </div>

          <!-- Time Duration -->
          <div class="flex flex-col mt-6">
            <label htmlFor="" className="font-poppins font-montserrat">
              Time Duration</label
            >
            <input class="input" placeholder="30 min" />
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
          />
        </div>
        <!-- Category -->
        <div>
          <div>
            <p
              class="text-primary hover:underline cursor-pointer w-fit"
              @click="openCatModal = true"
            >
              Add New Ingredient
            </p>
            <ModalAddCategory v-if="openCatModal" v-model="openCatModal" />
          </div>

          <ComboboxCategory />
        </div>
      </div>
      <!-- Right -->
      <div class="flex flex-col items-center">
        <div class="">
          <Imageupload />
        </div>

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
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const openIngrModal = ref(false);
const openCatModal = ref(false);
const ingredients = ref([{ ingredient: {}, amount: null, unit: null }]);

const addNewIngredientField = () => {
  console.log(ingredients.value);
  const lastIngredient = ingredients.value[ingredients.value.length - 1];
  if (
    lastIngredient.ingredient &&
    lastIngredient.amount &&
    lastIngredient.unit
  ) {
    ingredients.value.push({ ingredient: null, amount: null, unit: null });
  }
};

const removeIngredientField = (index) => {
  console.log("index", index, ingredients.value[index].ingredient);
  // remove the ingredient with index
  ingredients.value = ingredients.value.filter((_, i) => i !== index);
  // ingredients.value.splice(index, 1);
  console.log("index", index, ingredients.value[index].ingredient);
};

definePageMeta({
  title: "Create Recipe",
  description: "Create Recipe",
  middleware: "auth",
  layout: "admin",
});
</script>
