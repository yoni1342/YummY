<!-- components/SideBar/index.vue -->
<template>
    <div class="my-8">        
        <div>
            <SideBarElement active="true" name="/admin">
                <template #icon>
                    <Icon icon="clarity:dashboard-line" class="w-6 h-6 " />
                </template>
                <template #name>
                    Dashboard
                </template>
            </SideBarElement>

            <SideBarElement name="/admin/create-recipe">
                <template #icon>
                    <Icon icon="mingcute:add-fill" class="w-6 h-6 " />
                </template>
                <template #name>
                    Create Recipe
                </template>
            </SideBarElement>

        </div>
    </div>
</template>

<script setup>
    import { Icon } from "@iconify/vue";
</script>