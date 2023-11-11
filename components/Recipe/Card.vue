<template>
  <div v-if="!loadding">
    <div class="relative group">
      <nuxt-link :to="`/recipe/${recipe?.recipe_id}`">
        <div class="w-fit">
          <div class="relative group cursor-pointer group">
            <RecipeThumbnail
              :images="recipe.recipe_images"
              class="rounded-2xl w-[350px] h-[200px] object-cover"
            />

            <div
              v-if="isAdmin"
              class="absolute top-0 z-10 h-full w-full bg-black bg-opacity-80 rounded-2xl items-center justify-center hidden group-hover:flex"
            />
          </div>
          <div class="flex flex-col gap-3 my-3 w-[350px]">
            <!-- Top -->
            <div>
              <h3 class="font-quicksand text-2xl font-semibold">
                {{ recipe.title }}
              </h3>
            </div>
            <!-- Buttom -->
            <div class="line-clamp-2">
              {{ recipe.description }}
            </div>
          </div>
        </div>
      </nuxt-link>
      <div class="flex items-center justify-between text-sm">
        <!-- star -->
        <div class="flex items-center gap-3">
          <Icon icon="solar:star-bold" class="text-yellow-400" />
          <p class="font-montserrat font-light text-gray-500">
            {{ recipe.reviews_aggregate.aggregate.avg.rating }}({{
              recipe.reviews_aggregate.aggregate.count
            }})
          </p>
        </div>
        <!-- Likes -->
        <div class="flex items-center gap-3">
          <div v-if="liked" class="text-black" @click="handleUnlike">
            <Icon
              icon="solar:like-bold-duotone"
              class="text-primary w-6 h-6 cursor-pointer"
            />
          </div>
          <div v-else class="text-black" @click="handleLike">
            <Icon icon="solar:like-outline" class="w-6 h-6 cursor-pointer" />
          </div>
          <p class="font-montserrat font-light text-gray-500">
            {{ likecount }}
          </p>
        </div>
        <!-- Creator -->
        <nuxt-link :to="`/creator/${recipe?.user?.id}`">
          <div
            class="font-montserrat text-gray-500 font-light cursor-pointer hover:text-primary"
          >
            <p>by {{ recipe.user.first_name }}</p>
          </div>
        </nuxt-link>
      </div>

      <div class="hidden group-hover:flex">
        <Icon
          v-if="isAdmin"
          icon="fluent:delete-16-regular"
          class="absolute z-20 top-0 right-2 w-8 h-8 text-primary hover:text-primary cursor-pointer hover:scale-90 ease-in-out transition-transform duration-150"
          @click="openModal = true"
        />
        <nuxt-link :to="`/admin/edit-recipe/${recipe?.recipe_id}`">
          <Icon
            v-if="isAdmin"
            icon="carbon:edit"
            class="absolute z-20 top-0 right-10 w-8 h-8 text-primary hover:text-green-500 cursor-pointer hover:scale-90 ease-in-out transition-transform duration-150"
          />
        </nuxt-link>
      </div>
    </div>
    <div
      v-if="openModal"
      class="absolute inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    >
      <div class="relative bg-white rounded-lg shadow-lg">
        <div class="absolute top-0 right-0 p-4">
          <button
            @click="openModal = false"
            class="text-gray-600 hover:text-gray-500"
          >
            <Icon icon="mdi:close" class="w-6 h-6" />
          </button>
        </div>
        <div
          class="flex flex-col items-center justify-center w-full h-full p-10"
        >
          <div class="flex flex-col items-center justify-center w-full h-full">
            <div
              class="flex flex-col items-center justify-center w-full h-full"
            >
              <Icon
                icon="mingcute:warning-line"
                class="w-24 h-24 text-red-500"
              />
              <h2 class="text-2xl font-semibold mt-4 capitalize">
                Are You Sure You Want to delete this recipe
              </h2>
              <p class="text-gray-500 mt-2">{{ message }}</p>
              <div>
                <div class="btn w-fit" @click="handleDelete(recipe.recipe_id)">
                  Yes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <ModalLoading />
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import Mutation from "~/composables/useAuthMutation";
import Query from "~/composables/Query";
import DeleteRecipeMutation from "~/graphql/mutations/delete_recipe.gql";
import { toast } from "vue3-toastify";
import LikeRecipeMutation from "~/graphql/mutations/insert_like.gql";
import UnlikeRecipeMutation from "~/graphql/mutations/delete_like.gql";
import IsLikedQuery from "~/graphql/queries/isLiked.gql";
const props = defineProps({
  recipe: {
    type: Object,
    default: () => ({}),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
console.log(props.recipe, "S");
const userStore = useUserStore();
const liked = ref(userStore.isAuthenticated);
const openModal = ref(false);
const likecount = ref(props.recipe.likes_aggregate.aggregate.count);

const filter = computed(() => {
  let query = {};
  if (userStore.isAuthenticated) {
    query._and = {
      recipe_id: { _eq: props.recipe.recipe_id },
      user_id: { _eq: userStore?.user?.id },
    };
  }
  return query;
});

const { mutate, onError, onDone, loadding } = Mutation(DeleteRecipeMutation);
const {
  mutate: likeRecipe,
  onError: likeRecipeError,
  onDone: likeRecipeDone,
  loading: likeRecipeLoading,
} = Mutation(LikeRecipeMutation);

const {
  mutate: unlikeRecipe,
  onError: unlikeRecipeError,
  onDone: unlikeRecipeDone,
  loading: unlikeRecipeLoading,
} = Mutation(UnlikeRecipeMutation);

const {
  onResult: IsLiked,
  loading: IsLikedLoading,
  onError: IsLikedError,
  refetch: IsLikedRefetch,
} = Query(filter, {}, 1, 0, IsLikedQuery);

// *****************************Like Recipe**********************************
const handleLike = () => {
  if (!userStore.isAuthenticated) {
    toast.info("Please Login to like this recipe");
    navigateTo("/auth/login", { replace: true });
  } else {
    likeRecipe({
      recipe_id: props.recipe.recipe_id,
      user_id: userStore.user.id,
    });
    likecount.value += 1;
  }
};
likeRecipeDone((data) => {
  console.log(data, "dsds");
  liked.value = true;
});
likeRecipeError((error) => {
  toast.error(error.message);
});

// ******************************Unlike Recipe********************************
const handleUnlike = () => {
  if (!userStore.isAuthenticated) {
    toast.info("Please Login to like this recipe");
    navigateTo("/auth/login", { replace: true });
  } else {
    unlikeRecipe({
      recipe_id: props.recipe.recipe_id,
      user_id: userStore.user.id,
    });
    likecount.value -= 1;
  }
};
unlikeRecipeDone((data) => {
  liked.value = false;
});
unlikeRecipeError((error) => {
  toast.error(error.message);
});

// ********************************Is Liked***********************************
IsLiked((res) => {
  if (userStore.isAuthenticated) {
    const data = res.data.likes;
    if (data.length > 0) {
      liked.value = true;
    } else {
      liked.value = false;
    }
  }
});

const handleDelete = (id) => {
  console.log(id);
  mutate({ id });
  onDone((data) => {
    toast.success("Recipe Deleted");
    openModal.value = false;
    // router.refresh();
  });
  onError((error) => {
    toast.error(error.message);
  });
};
</script>
