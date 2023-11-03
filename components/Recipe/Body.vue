<template>
  <div class="px-[30px]">
    <div class="lg:grid grid-cols-2 place-items-start gap-10">
      <!-- Steps -->

      <div class="flex-1">
        <Step />
        <Comment />
      </div>
      <div class="flex-1">
        <!-- Ingredients -->
        <div>
          <h2 class="text-2xl font-quicksand font-semibold">Ingredients</h2>
          <Ingredients />
          <Ingredients />
          <Ingredients />
        </div>

        <!-- Categories -->
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl font-quicksand font-semibold">Catagories</h2>
          <div class="flex gap-2 flex-wrap">
            <Tag tag="Breakfast" />
            <Tag tag="Lunch" />
            <Tag tag="Dinner" />
            <Tag tag="Dessert" />
            <Tag tag="Snack" />
            <Tag tag="Drink" />
          </div>
        </div>
        <!-- Share -->
        <div class="flex flex-col gap-4">
          <h2 class="text-2xl font-quicksand font-semibold">Share Recipe</h2>
          <div>
            <ShareSocialMeadia />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
