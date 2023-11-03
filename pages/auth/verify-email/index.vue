<template>
  <div class="flex flex-col items-center justify-center">
    <div class="w-[500px]">
      <Vue3Lottie
        animationLink="https://lottie.host/67565166-c6ab-4bea-b665-c27058ab45d8/jkf2FFEPeL.json"
      />
    </div>
    <div class="flex flex-col items-center gap-2 px-3">
        <div class="text-center text-4xl font-quicksand text-primary" >
            Thank you for registering!
        </div>
        <div class="text-sm font-montserrat ">
            We have sent you an email. Please check your inbox and click on the link to verify your email.
            <span class="text-primary font-semibold">Verifay your email in 2hr.</span>
        </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-3">
        <button class="bg-primary text-white px-5 py-2 rounded-md mt-5">
            <a href="/">Go to Home</a>
        </button>
        <button class="bg-primary text-white px-5 py-2 rounded-md mt-5">
            <a href="/auth/login">Send Email Again</a> 
        </button>
    </div>
  </div>
</template>
