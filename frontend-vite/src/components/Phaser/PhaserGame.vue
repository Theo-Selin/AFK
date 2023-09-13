<template>
  <div id="phaser"></div>
</template>

<script setup lang="ts">
import Phaser from 'phaser';
import { onMounted, onUnmounted, ref } from 'vue';
import { GameScene } from '../../game/scenes/GameScene';

const game = ref<Phaser.Game>();

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#111111',
  parent: 'phaser', // ID of the DOM element to add the canvas to
  width: 628,
  height: 493,
  scene: GameScene,
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  }
};

onMounted(() => {
  game.value = new Phaser.Game(config);
});

onUnmounted(() => {
  if (game.value) {
    game.value.destroy(true);
  }
});
</script>

<style scoped>
@import './styles/_phaser-game.css';
</style>
