<template>
  <div class="flex items-center justify-center bg-grey-lighter">
    <label
      class="min-w-fit flex flex-col items-center px-4 py-2 text-blue rounded-lg tracking-wide uppercase border border-orange-300 cursor-pointer hover:bg-blue"
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"
        />
      </svg>
      <span class="text-sm">upload image</span>
      <input type="file" class="hidden" @change="handleFileInput" />
    </label>

    <div>
      <ImageuploadDisplay
        v-if="selectedImage"
        :url="selectedImage"
        @remove-image="selectedImage = null"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedImage = ref(null);
const base64Image = ref(null);

const handleFileInput = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type.startsWith("image/")) {
      // file.split('.')
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        base64Image.value = imageUrl.split(",")[1];
      };

      const imageUrl = URL.createObjectURL(file);
      selectedImage.value = imageUrl;
    }
  }
};

const emits = defineEmits(["update:modelValue"]);

watch(base64Image, (newValue) => {
  emits("update:modelValue", newValue);
});
</script>
