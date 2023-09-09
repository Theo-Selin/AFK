<template>
  <div class="login">
    <label for="email">email</label>
    <input v-model="email" name="email" />
    <label for="password">password</label>
    <input v-model="password" name="password" />
    <button @click="submitForm">Submit</button>
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
    const response = await axios.post("/api/auth/register", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    // Handle the response data as needed
    console.log(data);
  } catch (error) {
    // Handle errors here, e.g., display an error message
    console.error("Error:", error);
  }
};
</script>
