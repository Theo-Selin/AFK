<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-title">
        <h1>Login</h1>
      </div>
      <div class="input-wrapper">
        <label for="email">E-mail</label>
        <input v-model="email" type="email" id="email" />
      </div>
      <div class="input-wrapper">
        <label for="password">Password</label>
        <input v-model="password" type="password" id="password" />
      </div>

      <button @click="submitForm" class="submit-button">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

import axios from "axios";

const submitForm = async () => {
  try {
    const requestBody = {
      email: email.value,
      password: password.value,
    };
    const response = await axios.post("/api/auth/login", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.href = "/";

    const data = response.data;
    // Handle the response data as needed
    console.log(data);
  } catch (error) {
    // Handle errors here, e.g., display an error message
    console.error("Error:", error);
  }
};
</script>

<style scoped>
@import "./styles/_login.css";
</style>
