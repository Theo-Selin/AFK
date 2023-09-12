<template>
  <div class="home-wrapper">
    <div class="home-header">
      <phaser-game />
      <button @click="logout" class="logout">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import PhaserGame from "@/components/Phaser/PhaserGame.vue";

const user = ref("");

onMounted(() => {
  getUser();
});

const getUser = async () => {
  try {
    const response = await axios.get("/api/auth/user");
    user.value = response.data.user.email;
  } catch (error) {
    console.error("Get user error:", error);
  }
};

const logout = async () => {
  try {
    await axios.get("/api/auth/logout");
    window.location.href = "/login";
  } catch (error) {
    console.error("Logout error:", error);
  }
};
</script>

<style scoped>
@import "./styles/_home.scss";
</style>
