<template>
  <div class="home">
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {{ user }}!</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";

const user = ref({});

const logout = async () => {
  try {
    await axios.get("/api/auth/logout");
    // Redirect to the login page after logout
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>
