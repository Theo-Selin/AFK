<template>
  <Transition appear>
    <div v-if="showModal" class="wrapper">
      <div class="container">
        <div class="title">
          <h1>Login</h1>
        </div>
        <textfield-input
          v-model="formState.email"
          type="email"
          label="Email"
          id="email"
        />
        <textfield-input
          v-model="formState.password"
          type="password"
          label="Password"
          id="password"
        />
        <button @click="submitForm" class="submit-button">Login</button>
        <button @click="toggleModal" class="watch-button">Watch Video</button>
      </div>
      <p class="link-label">Don't have an account?</p>

      <router-link :to="{ name: 'register' }" class="link"
        >Create account</router-link
      >
    </div>
  </Transition>
  <button v-if="!showModal" @click="toggleModal" class="modal-button">
    Enter
  </button>
  <tube-player />
  <div v-if="showModal" class="overlay" id="overlay"></div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import TubePlayer from '@/components/Videoplayer/TubePlayer.vue';

import TextfieldInput from '@/components/Inputs/TextfieldInput.vue';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

const formState = reactive({
  email: '',
  password: ''
});

const showModal = ref(true);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const submitForm = async () => {
  try {
    authStore.login({ email: formState.email, password: formState.password });
  } catch (error) {
    // Handle errors here, e.g., display an error message
    console.error('Error:', error);
  }
};
</script>

<style scoped>
@import './styles/_login.css';

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
