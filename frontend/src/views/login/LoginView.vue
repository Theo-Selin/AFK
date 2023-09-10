<template>
  <div class="wrapper">
    <div class="container">
      <div class="title">
        <h1>Login</h1>
      </div>
      <textfield-input v-model="email" type="email" label="Email" id="email" />
      <textfield-input
        v-model="password"
        type="password"
        label="Password"
        id="password"
      />
      <button @click="submitForm" class="submit-button">Submit</button>
    </div>
    <router-link to="/register" class="link">Create account</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

import axios from "axios";
import TextfieldInput from "@/components/Inputs/TextfieldInput.vue";

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
@import "./styles/_login.scss";
</style>
