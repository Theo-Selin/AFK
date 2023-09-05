<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="fetchBackend">Go back</button>
  </div>
</template>

<script setup lang="ts">
const fetchBackend = async () => {
  const response = await fetch("/api/message");
  const data = await response.json();
  console.log(data);
};
</script>
