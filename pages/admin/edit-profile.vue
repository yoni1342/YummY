<template>
  <!-- component -->
  <div class="max-w-lg lg:ms-auto mx-auto text-center">
    <div class="text-primary font-quicksand text-5xl font-bold">Edit Your Profile Data</div>
    <div class="py-16 px-7 rounded-md bg-white">
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-5">
          <div class="flex flex-col items-start mt-6">
            <label htmlFor="" className="font-poppins font-montserrat">
              FirstName</label
            >
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="FirstName"
              class="input"
              v-model="first_name"
            />
          </div>
          <div class="flex flex-col items-start mt-6">
            <label htmlFor="" className="font-poppins font-montserrat">
              LastName</label
            >
            <input
              type="text"
              id="fname"
              name="fname"
              placeholder="LastName *"
              class="input"
              v-model="last_name"
            />
          </div>
        </div>

        <div class="flex flex-col items-start mt-6">
          <label htmlFor="" className="font-poppins font-montserrat">
            Profile Picture</label
          >
          <div
            class="relative rounded-full flex flex-col gap-2 items-center w-40 h-40 hover:bg-primary/20 group"
          >
            <img
              v-if="!selectedImage"
              :src="userStore.user.profile_picture"
              class="w-40 h-40 rounded-full object-cover p-1"
            />
            <img
              v-else="selectedImage"
              :src="selectedImage"
              class="w-40 h-40 rounded-full object-cover p-1"
            />

            <label class="">
              <div
                class="absolute rounded-full bottom-0 bg-primary px-2 py-1 text-white font-montserrat hidden group-hover:flex cursor-pointer hover:shadow-lg active:scale-95 transition-transform ease-in-out duration-150"
              >
                Change
                <input type="file" class="hidden" @change="handleFileInput" />
              </div>
            </label>
          </div>
          <div v-if="showUpload" class="btn" @click="uploadImage">
            {{imageUploadLoading ? "Uploading..." : "Upload"}}
          </div>

          <!-- <ImageuploadButton /> -->
        </div>
        <div class="flex flex-col items-start mt-6">
          <label htmlFor="" className="font-poppins font-montserrat">
            About Your Self</label
          >
          <textarea
            class="w-full input"
            placeholder="This recipe is about ...."
            v-model="about_me"
          />
        </div>

        <div class="">
          <div class="btn" @click="handleUpdate">
          {{ updateUserLoading ? "Updating..." : "Update"  }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import UpdateUserMutation from "~/graphql/mutations/update_user.gql";
import UseAuthMutation from "~/composables/useAuthMutation";
import { useUserStore } from "~/stores/user.js";
import { toast } from "vue3-toastify";
import ImageUploadMutation from "~/graphql/mutations/uploadImage.gql";

const userStore = useUserStore();
const showUpload = ref(false);
const first_name = ref(userStore.user.first_name);
const last_name = ref(userStore.user.last_name);
const profile_picture = ref(userStore.user.profile_picture);
const about_me = ref(userStore.user.about_me);
const selectedImage = ref(null);

const {
  mutate: imageUpload,
  onDone: imageUploadDone,
  loading: imageUploadLoading,
  onError: imageUploadError,
} = useAuthMutation(ImageUploadMutation);
const {
  mutate: updateUser,
  loading: updateUserLoading,
  onError: updateUserError,
  onDone: updateUserDone,
} = UseAuthMutation(UpdateUserMutation);

const handleFileInput = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.type.startsWith("image/")) {
      // file.split('.')
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        profile_picture.value = imageUrl.split(",")[1];
      };

      const imageUrl = URL.createObjectURL(file);
      selectedImage.value = imageUrl;
      showUpload.value = true;
    }
  }
};

imageUploadDone((result) => {
  const input = {
    id: userStore.user.id,
    obj: {
      profile_picture: result?.data?.uploadImage?.urls[0],
    },
  };

  updateUser(input);
  updateUserDone((result) => {
    userStore.setUser(result.data?.update_users_by_pk);
    // toast.success("Profile picture Upload Successfully");
    console.log(result.data);
  });
  updateUserError((error) => {
    toast.error(error.message);
  });

});

imageUploadError((error) => {
  toast.error(error.message);
});

const uploadImage = () => {
  const input = {
    image: [{ base64: profile_picture.value }],
  };
  imageUpload(input);
};

const handleUpdate = () => {
  const input = {
    id: userStore.user.id,
    obj: {
      about_me: about_me.value,
      first_name: first_name.value,
      last_name: last_name.value,
    },
  };
  updateUser(input);
};

updateUserDone((result) => {
  userStore.setUser(result.data?.update_users_by_pk);
  console.log(result.data);
  toast.success("User Profile Update Succesfuly");
});
updateUserError((error) => {
  toast.error(error.message);
});
definePageMeta({
  title: "Edit Profile",
  auth: true,
  middleware: "auth",
  layout: "admin",
});
</script>
