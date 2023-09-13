<template>
  <button class="submit-button" @click="emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click']);
</script>
