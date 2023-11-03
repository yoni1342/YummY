<!-- layouts/admin.vue -->
<template>
  <div class="h-screen">
    <div>
      <Nav />
    </div>
    <div class="flex h-[85%]">
      <!-- Side Bar -->
      <div class="bg-white flex-[15%] m-5 rounded-xl shadow-xl">
        <SideBar />
      </div>

      <!-- page -->
      <div class="flex-[85%] m-5 bg-white overflow-y-scroll shadow-xl">
        <slot />
      </div>
    </div>
  </div>
</template>
