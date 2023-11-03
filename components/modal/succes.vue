<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative w-full h-full bg-white rounded-lg shadow-lg">
      <div class="absolute top-0 right-0 p-4">
        <button @click="close" class="text-gray-600 hover:text-gray-500">
          <Icon icon="mdi:close" class="w-6 h-6" />
        </button>
      </div>
      <div class="flex flex-col items-center justify-center w-full h-full">
        <div class="flex flex-col items-center justify-center w-full h-full">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <Icon icon="mdi:check-circle" class="w-24 h-24 text-green-500" />
            <h2 class="text-2xl font-semibold mt-4">Success</h2>
            <p class="text-gray-500 mt-2">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
});
import { Icon } from "@iconify/vue";

const emits = defineEmits(["modelValue"]);
const close = () => {
  emits("modelValue", close);
};
</script>
