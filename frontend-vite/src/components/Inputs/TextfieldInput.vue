<template>
  <div class="input-wrapper">
    <input
      :type="type"
      :id="id"
      :placeholder="label"
      v-model="modelValue"
      class="input"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';

const props = defineProps({
  type: String,
  id: String,
  label: String
});

const modelValue = ref('');

const emits = defineEmits(['update:modelValue']);

watch(modelValue, (newValue) => {
  emits('update:modelValue', newValue);
});
</script>

<style scoped>
@import './styles/_input.scss';
</style>
