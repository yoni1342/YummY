<template>
  <!-- component -->
  <div class="w-full h-full flex bg-opacity-60">
    <div class="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
      <div
        class="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
        style="width: 450px"
        @dragover.prevent="handleDragOver"
        @drop="handleDrop"
      >
        <svg
          class="text-primary w-24 mx-auto mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <div class="input_field flex flex-col w-max mx-auto text-center">
          <label>
            <input
              class="text-sm cursor-pointer w-36 hidden"
              type="file"
              accept="image/*"
              multiple
              @change="handleFileInput"
            />
            <div
              class="text bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-white hover:text-primary transition-transform duration-300 ease-in-out transform active:scale-95"
            >
              Upload
            </div>
          </label>
          <div class="title text-orange-500 uppercase">or drop files here</div>
        </div>
        <!-- Image display area -->
        <div v-if="previewImages.length" class="mt-4 flex gap-4 flex-wrap">
          <div v-for="(image, index) in previewImages" :key="index">
            <ImageuploadDisplay :url="image" @remove-image="removeImage"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ...

const previewImages = ref([]);
const base64Images = ref([]);
const handleDragOver = (event) => {
  event.preventDefault();
};

const addImageToUploadList = (file) => {
  if (file.type.startsWith("image/") && previewImages.value.length < 4) {
    // file.split('.')
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const imageUrl = event.target.result;
      base64Images.value.push(imageUrl.split(",")[1]);
    };
    
    const imageUrl = URL.createObjectURL(file);
    previewImages.value.push(imageUrl);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    addImageToUploadList(files[i]);
  }
};

const handleFileInput = (event) => {
  const files = event.target.files;
  for (let i = 0; i < files.length; i++) {
    addImageToUploadList(files[i]);
  }
};

const removeImage = (imageUrl)=>{
  console.log(imageUrl)
  console.log(previewImages.value)
  previewImages.value = previewImages.value.filter((image)=> image !== imageUrl)
}

</script>
