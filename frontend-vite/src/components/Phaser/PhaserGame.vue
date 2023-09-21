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
  pixelArt: true,
  scene: [GameScene],
  physics: {
    default: 'arcade', // Use Arcade Physics as the default
    arcade: {
      gravity: { x: 0 } // Set gravity if needed
      // You can configure other properties of the Arcade Physics engine here
    }
  },
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
  },
  audio: {
    disableWebAudio: true // Disable Web Audio API
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
