<template>
    <div>
        ddl
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
})
</script>