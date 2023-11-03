<template>
  <div>
    <div>
      <Nav />
    </div>
    <div class="container">
      <!-- Banner -->
      <div class="flex flex-col lg:flex-row items-center px-3">
        <!-- right -->
        <div class="flex-1">
          <!-- image -->
          <NuxtImg
            src="https://cdn.hswstatic.com/gif/play/0b7f4e9b-f59c-4024-9f06-b3dc12850ab7-1920-1080.jpg"
            height="50"
            class="w-[200px] h-[200px] lg:w-[600px] lg:h-[600px] object-cover rounded-full"
          />
        </div>
        <!--  left-->
        <dev class="flex-1">
          <div>
            <!-- Name -->
            <div
              class="text-center text-[30px] lg:text-[60px] font-quicksand first-letter:text-primary"
            >
              Yonatan Tesfaye
            </div>
            <!-- About  -->
            <div class="text-lg font-montserrat">
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet.
            </div>
          </div>
          <div class="flex items-center gap-2">
            <!-- Number of recipes -->
            <Icon
              icon="arcticons:enrecipes"
              class="text-primary font-bold w-8 h-8"
            />
            <p class="text-lg font-light text-primary">22 recipes</p>
          </div>
        </dev>
      </div>
      <!-- Recipe list -->
      <div class="flex flex-col gap-4 my-20 items-center lg:items-end">
        <h2 class="text-2xl font-quicksand font-semibold">All Recipies</h2>
        <RecipeCardList />
      </div>
    </div>
    <Footer />
  </div>    
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>
