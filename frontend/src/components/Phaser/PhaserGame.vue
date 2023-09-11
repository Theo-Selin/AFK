<template>
  <div id="phaser-game"></div>
</template>

<script setup lang="ts">
import Phaser from "phaser";
import { onMounted } from "vue";

class Demo extends Phaser.Scene {
  constructor() {
    super("demo");
  }

  preload = () => {
    this.load.image(
      "background",
      "../../assets/backgrounds/1/bamboobridge.png"
    );
  };

  create = () => {
    this.add.image(400, 300, "background");
  };
}

const config = {
  type: Phaser.AUTO,
  backgroundColor: "#111111",
  width: 800,
  height: 600,
  scene: Demo,
};

const game = new Phaser.Game(config);

onMounted(() => {
  game;
});
</script>

<style scoped>
#phaser-game {
  margin: 0 auto;
}
</style>
