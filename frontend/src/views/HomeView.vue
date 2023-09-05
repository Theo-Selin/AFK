<template>
  <div class="home">
    <button @click="fetchMessage">Get Message</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const message = ref("");

const fetchMessage = async () => {
  const response = await fetch("/api/message");
  const data = await response.json();
  message.value = data.message;
};
</script>
