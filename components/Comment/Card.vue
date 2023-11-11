<template>
  <div class="flex flex-col gap-5">
    <!-- header -->
    <div class="flex gap-3 items-center">
      <!-- image -->
      <div>
        <NuxtImg
          :src="comment.user.profile_picture"
          height="50"
          class="w-20 h-20 object-cover rounded-full"
        />
      </div>
      <div>
        <p class="text-xl font-montserrat">{{comment.user.first_name}} {{comment.user.last_name}}</p>
        <p class="text-sm font-light font-montserrat text-gray-400">
          {{ new Date(comment?.created_at).toLocaleDateString() }}
        </p>
        <div class="flex">
          <Icon icon="solar:star-bold" class="text-yellow-400" v-for="i in comment.rating" />
          <Icon icon="solar:star-bold" class="text-gray-400" v-for="i in 5-comment.rating"/>
        </div>
      </div>
    </div>
    <!-- Commenr -->
    <div>
      {{ comment.comment }}
    </div>
  </div>
</template>

<script setup>
import { person } from "~/assets/images";
import { Icon } from "@iconify/vue";

const props = defineProps({
  comment: {
    type: Object,
    default: () => ({}),
  },
});

console.log("comm", props.comment);
</script>
