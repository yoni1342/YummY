<template>
    <div class="flex items-center gap-5 my-3 border-b-[1px] py-4 w-fit  ">
        <!-- image -->
        <div>
            <img :src="salt" alt="salt" class="w-[50px] h-[40px] lg:w-[70px] lg:h-[70px] rounded-full object-cover"/>
        </div>
        <!-- Name -->
        <div class="font-light font-montserrat text-gray-800">1 pound fresh prepared pizza dough</div>
    </div>
</template>

<script setup>
    import { salt } from "~/assets/images";
    import { Icon } from "@iconify/vue";
</script>