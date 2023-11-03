<template>
  <div class="flex items-center justify-between lg:block">
    <div class="flex items-center justify-between">
      <!-- logo -->
      <div class="flex items-center">
        <nuxt-link to="/">
          <div class="cursor-pointer">
            <img src="/logo.png" class="w-[200px] h-[100px] object-cover" />
          </div>
        </nuxt-link>
        <!-- Navs -->
        <div class="hidden lg:flex items-center gap-9 justify-between">
          <nuxt-link to="/" exact-active-class="text-primary">
            <div class="hover:text-primary cursor-pointer font-montserrat">
              HOME
            </div>
          </nuxt-link>
          <div class="hover:text-primary cursor-pointer font-montserrat">
            ABOUT
          </div>
          <div class="hover:text-primary cursor-pointer font-montserrat">
            CONTACT
          </div>
        </div>
      </div>

      <div class="hidden lg:flex items-center gap-3">
        <!-- Search -->
        <div class="">
          <div
            class="flex items-center rounded-xl border-[1px] border-primary hover:bg-primary/20 px-2 py-1"
          >
            <div
              class="px-2 py-1 rounded-xl flex items-center gap-1 hover:bg-white/50 cursor-pointer"
            >
              <div class="">
                <Icon icon="carbon:search" class="text-black" />
              </div>
              <input
                class="outline-none ` px-2 bg-primary/0 group-hover:bg-white/50"
              />
            </div>
            <div
              class="px-2 py-1 flex items-center gap-1 rounded-xl hover:bg-white/50 cursor-pointer"
            >
              <div>Recipe</div>
              <div>
                <Icon icon="mingcute:down-line" class="text-black" />
              </div>
            </div>
          </div>
        </div>

        <!-- Right side -->
        <div v-if="!isLogedin" class="hidden lg:flex">
          <div class="flex gap-5">
            <nuxt-link to="/auth/login">
              <div
                class="btn bg-white text-black hover:text-primary hover:bg-white"
              >
                Login
              </div>
            </nuxt-link>
            <nuxt-link to="/auth/register">
              <div class="btn">Register</div>
            </nuxt-link>
          </div>
        </div>
        <div v-else="isLogedin" class="hidden lg:flex">
          <div class="flex gap-5">
            <Icon
              icon="carbon:user-avatar"
              class="w-10 h-10 hover:text-primary cursor-pointer"
            />
            <div class="btn" @click="isLogedin = false">Logout</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3 lg:hidden">
      <Icon
        icon="carbon:search"
        class="text-3xl hover:text-primary cursor-pointer"
        @click="showSearch = true"
      />
      <Icon
        icon="mingcute:menu-fill"
        class="text-3xl hover:text-primary cursor-pointer"
        @click="showSideBar = !showSideBar"
      />
    </div>

    <!-- side bar -->
    <div
      v-if="showSideBar"
      class="absolute right-0 top-0 bg-black h-screen w-[100%]"
    >
      <!-- Header -->
      <div class="flex justify-between items-center gap-2 px-6">
        <div>
          <image src="/logo.png" class="w-32" />
        </div>
        <div
          class="hover:text-primary text-white text-5xl font-quicksand font-bold cursor-pointer"
          @click="showSideBar = !showSideBar"
        >
          X
        </div>
      </div>
      <!-- Navs -->
      <div class="text-white flex flex-col items-center justify-center w-full">
        <ul class="text-2xl font-montserrat font-bold flex flex-col gap-6">
          <li class="hover:text-primary cursor-pointer">HOME</li>
          <li class="hover:text-primary cursor-pointer">ABOUT</li>
          <li class="hover:text-primary cursor-pointer">CONTACT</li>
          <div v-if="!isLogedin" class="flex flex-col gap-6">
            <li class="hover:text-primary cursor-pointer">Signin</li>
            <li class="hover:text-primary cursor-pointer">Signup</li>
          </div>
          <div v-if="isLogedin" class="flex flex-col gap-6">
            <li class="hover:text-primary cursor-pointer">Profile</li>
            <li
              class="hover:text-primary cursor-pointer"
              @click="isLogedin = false"
            >
              Logout
            </li>
          </div>
        </ul>
      </div>
    </div>

    <!-- Mobile Search -->
    <div
      v-if="showSearch"
      class="z-10 absolute bg-white flex items-center gap-2"
    >
      <div
        class="text-2xl font-bold font-montserrat hover:text-primary cursor-pointer"
        @click="showSearch = false"
      >
        X
      </div>
      <div
        class="w-[250px] flex items-center rounded-xl border-[1px] border-primary hover:bg-primary/20 px-2 py-1"
      >
        <div
          class="w-[70%] px-2 py-1 rounded-xl flex items-center gap-1 hover:bg-white/50 cursor-pointer"
        >
          <div class="">
            <Icon icon="carbon:search" class="text-black" />
          </div>
          <input
            class="outline-none px-1 w-full bg-primary/0 group-hover:bg-white/50"
          />
        </div>
        <div
          class="text-sm w-[25%] px-1 py-1 flex items-center rounded-lg hover:bg-white/50 cursor-pointer"
        >
          <div class="">Recipe</div>
          <div>
            <Icon icon="mingcute:down-line" class="text-black" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const showSideBar = ref(false);
const showSearch = ref(false);
const isLogedin = ref(true);
</script>
