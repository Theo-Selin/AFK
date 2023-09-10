<template>
  <div class="wrapper">
    <div class="container">
      <div class="title">
        <h1>Create</h1>
      </div>
      <textfield-input v-model="username" type="text" label="Username" />
      <textfield-input v-model="email" type="email" label="Email" />
      <textfield-input v-model="password" type="password" label="Password" />
      <button @click="submitForm" class="submit-button">Submit</button>
    </div>
    <router-link to="/login" class="link">Login</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import TextfieldInput from "@/components/Inputs/TextfieldInput.vue";
import router from "@/router";
import store from "@/store";

const username = ref("");
const email = ref("");
const password = ref("");

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
</style>
