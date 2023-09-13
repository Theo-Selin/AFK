<template>
  <div class="input-wrapper">
    <input
      :type="type"
      :id="id"
      :placeholder="label"
      v-model="modelMapping"
      class="input"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, computed } from 'vue';

interface Props {
  type: string;
  id: string;
  label: string;
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const modelMapping = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<style scoped>
@import './styles/_input.scss';
</style>
