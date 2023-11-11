<template>
  <div v-if="!loading">
    <div>
      <Nav />
    </div>
    <div class="container">
      <!-- Banner -->
      <div class="flex flex-col lg:flex-row items-center px-3">
        <!-- right -->
        <div class="flex-1">
          <!-- image -->
          <NuxtImg
            :src="userInfo.profile_picture"
            height="50"
            class="w-[200px] h-[200px] lg:w-[600px] lg:h-[600px] object-cover rounded-full"
          />
        </div>
        <!--  left-->
        <dev class="flex-1">
          <div>
            <!-- Name -->
            <div
              class="text-center text-[30px] lg:text-[60px] font-quicksand first-letter:text-primary"
            >
              {{ userInfo.first_name }} {{ userInfo.last_name }}
            </div>
            <!-- About  -->
            <div class="text-lg font-montserrat">
              {{ userInfo.about_me }}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <!-- Number of recipes -->
            <Icon
              icon="arcticons:enrecipes"
              class="text-primary font-bold w-8 h-8"
            />
            <p class="text-lg font-light text-primary">
              {{ userInfo.recipes_aggregate.aggregate.count }} recipes
            </p>
          </div>
        </dev>
      </div>
      <!-- Recipe list -->
      <div class="flex flex-col gap-4 my-20 items-center lg:items-end">
        <h2 class="text-2xl font-quicksand font-semibold">All Recipies</h2>
        <RecipeCardList :recipes="userInfo.recipes" />
      </div>
    </div>
    <Footer />
  </div>
  <div v-else>
    <ModalLoading message="loading...." />
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import Query from "~/composables/singleQuery";
import GetUserByIdQuery from "~/graphql/queries/getUserById.gql";
const route = useRoute();
const id = route.params.id;
const userInfo = ref({});
const { onResult, loading, onError, refetch } = Query(id, GetUserByIdQuery);

onResult((result) => {
  console.log(result.data.users_by_pk);
  userInfo.value = result.data.users_by_pk;
});
</script>
