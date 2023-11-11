<template>
  <div v-if="!GetBookmarkLoading">
    <div class="relative h-full">
      <RecipeCardList :recipes="bookmarkedRecipes" />
    </div>
  </div>
  <div v-else>
    <ModalLoading message="Loading...." />
  </div>
  <div v-if="bookmarkedRecipes.length == 0">
    <div class="flex flex-col items-center justify-center h-full">
      <div class="flex flex-col items-center justify-center">
        <div class="flex items-center justify-center">
          <Icon
            icon="mdi:bookmark-remove-outline"
            class="w-16 h-16 text-gray-400"
          />
        </div>
        <div class="mt-4 text-lg font-semibold text-gray-400">No Bookmarks</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Query from "~/composables/useAuthQuery";
import GetBookmarks from "~/graphql/queries/getbookmarks.gql";
const userStore = useUserStore();
const bookmarkedRecipes = ref([]);

const filter = computed(() => {
  let query = {};

  if (userStore.isAuthenticated) {
    query = {
      user_id: { _eq: userStore?.user?.id },
    };
  }
  return query;
});

const {
  onResult: GetBookmark,
  loading: GetBookmarkLoading,
  onError: GetBookmarkError,
  refetch: GetBookmarkRefetch,
} = Query(filter, {}, 1, 0, GetBookmarks);

GetBookmark((res) => {
  res?.data?.bookmarks?.map((res) => {
    bookmarkedRecipes.value.push(res.recipe);
  });
});

definePageMeta({
  title: "Create Recipe",
  description: "Create Recipe",
  middleware: "auth",
  layout: "admin",
});
</script>
