<template>
  <div>
    <teleport to="body">
      <div class="bg-black w-screen h-screen absolute top-0 left-0 opacity-80">
        <!-- Modal -->
        <div class="fixed inset-0 flex items-center justify-center z-50">
          <div
            class="bg-white rounded-lg p-6 w-96 max-w-full shadow-lg transform transition-all duration-300"
          >
            <!-- Modal Header -->
            <div
              class="flex justify-between items-center border-b-2 border-gray-200 pb-4"
            >
              <h2 class="text-2xl font-semibold">Add New Category</h2>
              <button
                @click="close"
                class="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <!-- Modal Content -->
            <div class="mt-6 space-y-4">
              <input class="input" placeholder="e.g Dessert" v-model="name" />

              <div class="flex flex-col space-y-4">
                <button
                  class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                  @click="addCategoryHandler"
                >
                  Create New Category
                </button>
              </div>
            </div>
            <div
              v-if="success"
              class="fixed inset-0 flex items-center justify-center z-50"
            >
              <ModalSucces
                v-model="success"
                @modelValue="close"
                message="Your category has been added"
              />
            </div>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import InsertCategoryMutaion from "~/graphql/mutations/insert_catagory.gql";
import { toast } from "vue3-toastify";

const name = ref("");

const success = ref(false);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(["update:modelValue"]);

const close = () => {
  console.log("first");
  emits("update:modelValue", false);
};
const {
  mutate: insertCatagory,
  onDone: insertCatagoryDone,
  loading: insertCatagoryLoading,
  onError: insertCatagoryError,
} = useAuthMutation(InsertCategoryMutaion);

const addCategoryHandler = () => {
  const input = {
    name: name.value,
  };
  insertCatagory(input);
};

insertCatagoryError((error) => {
  toast.error(error.message);
});

insertCatagoryDone((result) => {
  success.value = true;
});
</script>
