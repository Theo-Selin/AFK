<template>
  <div class="home">
    <button @click="fetchMessage">Get Message</button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const message = ref("");

const fetchMessage = async () => {
  const response = await fetch("/api/messages/hello");
  const data = await response.json();
  message.value = data.message;
};
</script>
