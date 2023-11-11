<template>
  <div class="flex items-start gap-4">
    <div @click="clicked = !clicked">
      <Icon
        icon="ph:check-circle-light"
        :class="[
          'w-14 h-14 rounded-full cursor-pointer text-primary hover:bg-primary hover:text-white',
          { 'bg-primary text-white': clicked },
        ]"
      />
    </div>
    <div class="flex flex-col gap-4 py-2">
      <div class="flex items-center gap-3">
        <h3 class="text-xl font-quicksand text-primary uppercase">
          {{ step.order }}. Step
        </h3>
        <div class="w-[80%] border-b-[1px]" />
      </div>
      <p
        :class="[
          'font-montserrat font-light text-black',
          { 'text-gray-400': clicked },
        ]"
      >
        {{ step.step_description }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  step: {
    type: Object,
    default: () => ({}),
  },
});

const clicked = ref(false);
</script>
