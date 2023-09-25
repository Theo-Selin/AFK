<template>
  <div
    class="home-wrapper__sidebar"
    :class="{
      open: isSidebarOpen,
      closed: !isSidebarOpen
    }"
  >
    <slot v-if="isSidebarOpen" />
    <button
      v-if="left"
      @click="toggleSidebar"
      class="sidebar-toggle__button-left"
    >
      <i class="fa-solid fa-hand-fist"></i>
    </button>
    <button
      v-if="right"
      @click="toggleSidebar"
      class="sidebar-toggle__button-right"
    >
      <i class="fa-solid fa-fire-flame-curved"></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  left: Boolean,
  right: Boolean
});

const isSidebarOpen = ref(false);
const left = props.left;
const right = props.right;

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style scoped>
@import './styles/_sidebar.css';
</style>
