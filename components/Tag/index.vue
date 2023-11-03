<template>
  <div
    class="px-3 py-2 bg-primary/5 rounded-xl w-fit font-montserrat text-sm text-gray-500 cursor-pointer hover:bg-primary/10 transition-all"
  >
    {{ tag  }}
  </div>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    required: true,
  },
})  
</script>