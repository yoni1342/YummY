<template>
  <div class="relative group">
    <img :src="url" alt="Uploaded Image" class="w-20 h-20 rounded-full mr-2 mb-2 object-cover" />
    <div class="bg-black/20 absolute top-0 h-full w-full hidden group-hover:block">
      <button
        @click="removeImage"
        class="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 h-3 sm:h-4 sm:w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M6.293 6.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414L11.414 12l2.293 2.293a1 1 0 01-1.414 1.414L10 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 12 6.293 9.707a1 1 0 010-1.414z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(['remove-image'])

const removeImage = () => {
  console.log(props.url)
  emit("remove-image", props.url);
};


</script>
