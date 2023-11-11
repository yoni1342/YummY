<template>
  <!-- <teleport to="body"> -->
  <div
    class="inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative w-full h-full bg-white rounded-lg ">
      <div class="absolute top-0 right-0 p-4">
      </div>
      <div class="flex flex-col items-center justify-center w-full h-full">
        <div class="flex flex-col items-center justify-center w-full h-full">
          <div class="flex flex-col items-center justify-center w-full h-full">
            <div>
              <Vue3Lottie
                animationLink="https://lottie.host/63350937-ccd2-43d6-97a1-4c42c98d0cc6/RigbskoorK.json"
              />
            </div>
            <h2 class="text-2xl font-semibold mt-4">Lodding</h2>
            <p class="text-gray-500 mt-2">{{ message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </teleport> -->
</template>

<script setup>
const props = defineProps({
  message: String,
});
</script>
