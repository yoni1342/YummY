<template>
  <div class="flex items-center gap-5 my-3 border-b-[1px] py-4 w-fit">
    <!-- image -->
    <div>
      <img
        :src="ingredent.ingredient.picture"
        alt="salt"
        class="w-[50px] h-[40px] lg:w-[70px] lg:h-[70px] rounded-full object-cover"
      />
    </div>
    <!-- Name -->
    <div class="font-light font-montserrat text-gray-800">
      {{ingredent.quantity}} {{ingredent.unit}} of {{ingredent.ingredient.name}}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  ingredent: {
    type: Object,
    default: () => ({}),
  },
});

</script>
