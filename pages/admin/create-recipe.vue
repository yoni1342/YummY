<template>
  <div class="flex flex-col items-center py-10 relative">
    <!-- <div  class="h-[80%] w-[80%] z-50 fixed top-20">
      <ModalLoading message="Adding Recipe" />
    </div> -->
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
        <div class="">
          <!-- **********************************IMAGE************************************************ -->
          <div class="w-full h-full flex bg-opacity-60">
            <div
              class="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg"
            >
              <div
                class="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                style="width: 450px"
                @dragover.prevent="handleDragOver"
                @drop="handleDrop"
              >
                <svg
                  class="text-primary w-24 mx-auto mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <div
                  class="input_field flex flex-col w-max mx-auto text-center"
                >
                  <label>
                    <input
                      class="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      accept="image/*"
                      multiple
                      @change="handleFileInput"
                    />
                    <div
                      class="text bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-white hover:text-primary transition-transform duration-300 ease-in-out transform active:scale-95"
                    >
                      Upload
                    </div>
                  </label>
                  <div class="title text-orange-500 uppercase">
                    or drop files here
                  </div>
                </div>
                <!-- Image display area -->
                <div
                  v-if="previewImages.length"
                  class="mt-4 flex gap-4 flex-wrap"
                >
                  <div v-for="(image, index) in previewImages" :key="index">
                    <div class="relative group">
                      <img
                        :src="image"
                        alt="Uploaded Image"
                        class="w-20 h-20 rounded-full mr-2 mb-2 object-cover"
                      />
                      <div
                        class="bg-black/20 absolute top-0 h-full w-full hidden group-hover:block"
                      >
                        <button
                          @click="removeImage(index)"
                          class="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- ***********************************************Ingredent*************************************************************** -->
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
    <div class="btn w-fit" @click="handleSubmit">
      {{ imageUploadLoading || recipeCreateLoading ? "Loading..." : "Submit" }}
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { useUserStore } from "~/stores/user.js";
import ImageUploadMutation from "~/graphql/mutations/uploadImage.gql";
import insertRecipeQuery from "~/graphql/mutations/insert_recipe.gql";
import { toast } from "vue3-toastify";

const userStore = useUserStore();

// ******************************** Image ********************************
const previewImages = ref([]);
const base64Images = ref([]);

const handleDragOver = (event) => {
  event.preventDefault();
};

const addImageToUploadList = (file) => {
  if (file.type.startsWith("image/") && previewImages.value.length < 4) {
    // file.split('.')
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      base64Images.value.push(imageUrl.split(",")[1]);
    };

    const imageUrl = URL.createObjectURL(file);
    previewImages.value.push(imageUrl);
    // console.log(base64Images.value);
    // console.log(base64Images.value);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    addImageToUploadList(files[i]);
  }
};

const handleFileInput = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    addImageToUploadList(files[i]);
  }
};

const removeImage = (idx) => {
  previewImages.value = previewImages.value.filter(
    (image, index) => index !== idx
  );
  base64Images.value = base64Images.value.filter(
    (image, index) => index !== idx
  );
  // console.log(base64Images.value);
};
// ******************************** Ingredients Logic ********************************
const openIngrModal = ref(false);
const ingredients = ref([{ ingredient: {}, amount: null, unit: null }]);

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
  console.log("index", index, ingredients.value[index].ingredient);
  // ingredients.value = ingredients.value.filter((_, i) => i !== index);
  ingredients.value.splice(index, 1);
  // console.log("index", index, ingredients.value[index].ingredient);
};

// ******************************** Category ********************************
const openCatModal = ref(false);
const categories = ref([{ category: null }]);
const addNewCategoryField = () => {
  // console.log(categories.value);
  const lastCategory = categories.value[categories.value.length - 1];
  if (lastCategory.category) {
    categories.value.push({ category: null });
  }
  console.log("ccc", categories.value);
};

const removeCategoryField = (index) => {
  categories.value = categories.value.filter((_, i) => i !== index);
};

// ******************************** Steps ********************************
const steps = ref([{ step_description: null }]);

const addNewStepField = () => {
  const lastStep = steps.value[steps.value.length - 1];
  if (lastStep.step_description) {
    steps.value.push({ step_description: null });
    // console.log(steps.value);
  }
};

const removeStepField = (index) => {
  steps.value = steps.value.filter((_, i) => i !== index);
};

//**********************************Recipe info******************* */
//**********************************Recipe info******************* */
//**********************************Recipe info******************* */
const recipeTitle = ref("");
const recipeDuration = ref("");
const recipeDescriprion = ref("");
// ***************************************All Recipe Info ************************
const {
  mutate: imageUpload,
  onDone: imageUploadDone,
  loading: imageUploadLoading,
  onError: imageUploadError,
} = useAuthMutation(ImageUploadMutation);

const {
  mutate: recipeCreate,
  onDone: recipeCreateDone,
  loading: recipeCreateLoading,
  onError: recipeCreateError,
} = useAuthMutation(insertRecipeQuery);
const handleSubmit = () => {
  // ingredent collector
  const ingredientInfo = [];
  ingredients.value.map((ingredient, index) => {
    ingredientInfo.push({
      ingredient_id: ingredient.ingredient.ingredient_id,
      unit: ingredient.unit,
      quantity: ingredient.amount,
    });
  });
  // category collector
  const categoryId = [];
  categories.value.map((catagory) => {
    categoryId.push({
      category_id: catagory.category.category_id,
    });
  });
  const stepss = [];
  steps.value.map((step, index) => {
    stepss.push({
      step_description: step.step_description,
      order: index + 1,
    });
  });
  //********************************************************upload Image************************************* */

  const base64Img = [];
  base64Images.value.map((val) => {
    base64Img.push({
      base64: val,
    });
  });

  const input = {
    image: base64Img,
  };
  imageUpload(input);

  imageUploadError((error) => {
    toast.error(error.message);
  });
  imageUploadDone((result) => {
    // image collector
    const imageUrls = [];
    result?.data?.uploadImage?.urls.map((url) => {
      imageUrls.push({ image: url });
    });

    const item = ref({
      description: recipeDescriprion,
      title: recipeTitle,
      preparation_time: recipeDuration,
      recipe_ingredients: {
        data: ingredientInfo,
      },
      stepes: {
        data: stepss,
      },
      recipe_categories: {
        data: categoryId,
      },
      recipe_images: {
        data: imageUrls,
      },
      user_id: userStore.user.id,
    });

    recipeCreate({
      obj: item.value,
    });

    recipeCreateDone((result) => {
      navigateTo("/admin/my-recipes", { replace: true });
      console.log(result.data);
    });
    recipeCreateError((error) => {
      toast.error(error.message);
    });
  });
};

definePageMeta({
  title: "Create Recipe",
  description: "Create Recipe",
  middleware: "auth",
  layout: "admin",
});
</script>
