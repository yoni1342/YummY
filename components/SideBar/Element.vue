<!-- components/SideBar/Element.vue -->
<template>
  <nuxt-link
    :to="name"
    class="flex items-center justify-start gap-3 py-3 my-2 hover:text-primary cursor-pointer px-10"
    exact-active-class="text-primary"
  >
    <div class="flex gap-3">
      <!-- Icon -->
      <div class="">
        <!-- <Icon icon="carbon:home" class="w-6 h-6 " /> -->
        <slot name="icon"></slot>
      </div>

      <!-- Name -->
      <div class="text-xl font-inter font-semibold">
        <slot name="name"></slot>
      </div>
    </div>
  </nuxt-link>
</template>

<script setup>
import { Icon } from "@iconify/vue";
defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  name: String
});
</script>
