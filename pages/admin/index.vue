<template>
  <div class="relative">
    <div class="h-full">
        <ModalLoading message="The page in undeer construction" />
    </div>
  </div>
</template>
<script setup>
import { useUserStore } from "~/stores/user.js";
const userStore = useUserStore();

definePageMeta({
  title: "Admin",
  description: "Admin",
  middleware: "auth",
  layout: "admin",
});
</script>
