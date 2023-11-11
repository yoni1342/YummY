<template>
  <div v-if="!loading">
    <div class="px-[30px] py-3">
      <Nav />
    </div>
    <div class="container">
      <div class="lg:flex">
        <!-- Picture -->
        <div class="p-3 lg:flex-1">
          <RecipeImagePreview :images="info.recipe_images" />
          <!-- <img :src="recipe1" class="rounded-2xl object-cover" /> -->
        </div>
        <!-- Descriptions -->
        <div class="p-3 flex flex-col items-center lg:flex-1">
          <div class="flex flex-col gap-3">
            <div class="flex items-center">
              <h2 class="text-4xl lg:text-6xl font-quicksand font-semibold">
                {{ info.title }}
              </h2>
              <Icon
                @click="handleAddToBookmark"
                v-if="!bookmarked"
                icon="carbon:bookmark"
                class="z-20 w-8 h-8 text-black cursor-pointer hover:scale-90 ease-in-out transition-transform duration-150"
              />
              <Icon
                @click="handleRemoveBookmark"
                v-if="bookmarked"
                icon="prime:bookmark-fill"
                class="z-20 w-8 h-8 text-primary cursor-pointer hover:scale-90 ease-in-out transition-transform duration-150"
              />
            </div>
            <p class="font-montserrat mt-4 text-gray-800">
              {{ info.description }}
            </p>
          </div>

          <div class="flex p-4 items-center justify-between w-full">
            <div class="flex flex-col items-center font-light">
              <Icon icon="carbon:time" class="w-4 h-4" />
              <p class="font-montserrat text-gray-500 text-sm">Total Time</p>
              <p class="font-montserrat text-gray-500 text-xs">
                {{ info.preparation_time }} mins
              </p>
            </div>
            <div class="text-sm font-montserrat font-light">
              <nuxt-link :to="`/creator/${info?.user?.id}`">
                <p class="hover:text-primary cursor-pointer">
                  Created by {{ info?.user?.first_name }}
                </p>
              </nuxt-link>
              <p>21 recipes</p>
            </div>
          </div>
        </div>
      </div>
      <!-- Steps -->
      <div>
        <div>
          <RecipeBody
            :steps="info.stepes"
            :ingredients="info.recipe_ingredients"
            :catagories="info.recipe_categories"
            :reviews="info.reviews"
          />
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <div v-else>
    <ModalLoading />
  </div>
</template>
<script setup>
import { recipe1 } from "~/assets/images";
import { Icon } from "@iconify/vue";
import Query from "~/composables/singleQuery";
import Mutation from "~/composables/useAuthMutation";
import GetRecipeByIdQuery from "~/graphql/queries/getRecipesById.gql";
import InsertBookMarkMutation from "~/graphql/mutations/insert_bookmark.gql";
import DeleteBookMarkMutation from "~/graphql/mutations/delete_bookmark.gql";
import IsBookMarkedQuery from "~/graphql/queries/isBookmarked.gql";
import Quryyy from "~/composables/useAuthQuery";
const userStore = useUserStore();
const route = useRoute();
const recipe_id = route.params.id;
const bookmarked = ref(userStore.isAuthenticated);
const info = ref({});

const { onResult, loading, onError, refetch } = Query(
  recipe_id,
  GetRecipeByIdQuery
);

const filter = computed(() => {
  let query = {};

  if (userStore.isAuthenticated) {
    query._and = {
      recipe_id: { _eq: recipe_id },
      user_id: { _eq: userStore?.user?.id },
    };
  }
  return query;
});

const {
  onResult: isBookMarked,
  loading: isBookMarkedLoading,
  onError: isBookMarkedError,
  refetch: isBookMarkedRefetch,
} = Quryyy(filter, {}, 1, 0, IsBookMarkedQuery);

isBookMarked((res) => {
  const data = res.data.bookmarks;
  if (data.length > 0) {
    bookmarked.value = true;
  } else {
    bookmarked.value = false;
  }
});

const {
  mutate: InsetBookmark,
  onDone: InsetBookmarkDone,
  loading: InsetBookmarkLoading,
  onError: InsetBookmarkError,
} = Mutation(InsertBookMarkMutation);
const {
  mutate: DeleteBookmark,
  onDone: DeleteBookmarkDone,
  loading: DeleteBookmarkLoading,
  onError: DeleteBookmarkError,
} = Mutation(DeleteBookMarkMutation);

const handleAddToBookmark = () => {
  if (!userStore.isAuthenticated) {
    navigateTo("/auth/login", { replace: true });
  }
  const input = {
    recipe_id,
    user_id: userStore.user.id,
  };
  InsetBookmark(input);
};

const handleRemoveBookmark = () => {
  const input = {
    recipe_id,
    user_id: userStore.user.id,
  };
  DeleteBookmark(input);
};

InsetBookmarkDone(() => {
  bookmarked.value = true;
});
DeleteBookmarkDone(() => {
  bookmarked.value = false;
});
onResult((result) => {
  // console.log("result", result);
  info.value = result.data.recipes_by_pk;
});
</script>
