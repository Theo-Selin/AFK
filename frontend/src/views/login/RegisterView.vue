<template>
  <Transition appear>
    <div v-if="showModal" class="wrapper">
      <div class="container">
        <div class="title">
          <h1>Create</h1>
        </div>
        <textfield-input
          v-model="username"
          type="text"
          label="Username"
          id="username"
        />
        <textfield-input
          v-model="email"
          type="email"
          label="Email"
          id="email"
        />
        <textfield-input
          v-model="password"
          type="password"
          label="Password"
          id="password"
        />
        <button @click="submitForm" class="submit-button">Submit</button>
        <button v-if="showModal" @click="toggleModal" class="watch-button">
          Watch Video
        </button>
      </div>
      <p class="link-label">Already have an account?</p>
      <router-link :to="{ name: 'login' }" class="link">Login here</router-link>
    </div>
  </Transition>
  <button v-if="!showModal" @click="toggleModal" class="modal-button">
    Enter
  </button>
  <tube-player />
  <div v-if="showModal" class="overlay" id="overlay"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import TextfieldInput from "@/components/Inputs/TextfieldInput.vue";
import router from "@/router";
import TubePlayer from "@/components/Videoplayer/TubePlayer.vue";

const username = ref("");
const email = ref("");
const password = ref("");
const showModal = ref(true);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const submitForm = async () => {
  try {
    const requestBody = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    const response = await axios.post("/api/auth/register", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    // Handle the response data as needed
    router.push("/login");
  } catch (error) {
    // Handle errors here, e.g., display an error message
    console.error("Error:", error);
  }
};
</script>

<style scoped>
@import "./styles/_login.scss";

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
