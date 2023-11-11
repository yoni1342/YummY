<template>
  <div class="flex gap-4">
    <div class="flex flex-col gap-3">
      <div v-for="(image, index) in imagesList" :key="index" class="cursor-pointer" @mouseenter="selectedIndex=index">
        <img :src="image" class="rounded-2xl w-20 h-20 object-cover" />
      </div>
    </div>
    <div>
      <img :src="imagesList[selectedIndex]" class="w-[600px] h-[500px] rounded-2xl object-cover" />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { recipe1 } from "~/assets/images";
const imagesList = ref([]);
const selectedIndex = ref(0);
const props = defineProps({
  images: {
    type: Array,
    default: () => ({}),
  },
});

props.images.map((image) => {
  imagesList.value.push(image.image);
});
</script>
