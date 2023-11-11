<template>
  <div>
    <Swiper
      ref="mySwiper"
      :height="300"
      :modules="[SwiperAutoplay, SwiperEffectCreative]"
      :slides-per-view="1"
      :loop="true"
      :effect="'creative'"
      :autoplay="autoPlay"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
    >
      <SwiperSlide v-for="(image, idx) in images" :key="idx" class="rounded-2xl">
        <img
          :src="image.image"
          class="rounded-2xl w-[350px] h-[200px] object-cover"
        />
      </SwiperSlide>
      <!-- <SwiperControls /> -->
    </Swiper>
  </div>
</template>

<script setup>
const props = defineProps({
  images: {
    type: Array,
    default: () => ({}),
  },
});
const autoPlay = ref({
  delay: 6000,
  disableOnInteraction: true,
});
</script>
