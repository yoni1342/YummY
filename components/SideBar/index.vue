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
            <SideBarElement name="/admin/edit-profile">
                <template #icon>
                    <Icon icon="clarity:avatar-line" class="w-6 h-6 " />
                </template>
                <template #name>
                    Edit Profile
                </template>
            </SideBarElement>
            <SideBarElement name="/admin/my-recipes">
                <template #icon>
                    <Icon icon="arcticons:recipe-keeper" class="w-6 h-6 " />
                </template>
                <template #name>
                    My Recipes
                </template>
            </SideBarElement>
            <SideBarElement name="/admin/bookmark">
                <template #icon>
                    <Icon icon="material-symbols:bookmark" class="w-6 h-6 " />
                </template>
                <template #name>
                    Bookmarks
                </template>
            </SideBarElement>

        </div>
    </div>
</template>

<script setup>
    import { Icon } from "@iconify/vue";
</script>