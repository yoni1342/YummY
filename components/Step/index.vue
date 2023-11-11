<template>
  <div>
    <h2 class="text-3xl font-quicksand font-semibold">How To Make It</h2>
    <StepList v-for="(step, index) in steps" :step="step" />
  </div>
</template>
<script setup>
const props = defineProps({
  steps: {
    type: Array,
    default: () => ({}),
  },
});
</script>
