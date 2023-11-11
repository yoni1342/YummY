<template>
  <div class="my-10">
    <div class="text-2xl font-quicksand font-bold">Comments</div>

    <div v-if="userStore.isAuthenticated">
      <CommentStarRating v-model:value="reatingCount" />
      <textarea
        class="w-full input"
        placeholder="Write Your Comment"
        v-model="comment"
      />
      <div class="btn w-fit" @click="handleComment">
        {{ loading ? "Commenting" : "Comment" }}
      </div>
    </div>
    <div class="flex flex-col gap-5 mt-5">
      <CommentCard  v-for="(comment, index) in reviews" :key="index" :comment="comment"/>
    </div>
  </div>
</template>
<script setup>
import Mutation from "~/composables/useAuthMutation";
import InsertReview from "~/graphql/mutations/insert_review.gql";
const userStore = useUserStore();
const props = defineProps({
  reviews: {
    type: Array,
    default: () => ({}),
  },
});
const route = useRoute();
const reatingCount = ref(0);
const comment = ref("");
const { mutate, loading, onError, onDone } = Mutation(InsertReview);

const handleComment = () => {
  const input = {
    comment: comment.value,
    rating: reatingCount.value,
    user_id: userStore.user.id,
    recipe_id: route.params.id,
  };
  mutate({ input });
};

onDone(() => {
  window.location.reload();
});

onError((error) => {
  toast.error(error.message);
});
onDone(() => {
  toast.success("Comment Added");
});
</script>
