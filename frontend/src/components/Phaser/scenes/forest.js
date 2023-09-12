import Phaser from "phaser";

class Demo extends Phaser.Scene {
  constructor() {
    super("phaser-game");
  }

  preload = () => {
    this.load.image("sea", "assets/backgrounds/1/sea.png");
    this.load.image("bridge", "assets/backgrounds/1/bridge.png");
    this.load.image("bamboo", "assets/backgrounds/1/bamboo.png");
  };

  create = () => {
    const background = this.add.image(400, 300, "sea");
    const bridge = this.add.image(400, 300, "bridge");
    const bamboo = this.add.image(400, 300, "bamboo");

    background.setDisplaySize(this.scale.width, this.scale.height);
    bamboo.setDisplaySize(this.scale.width / 1.2, this.scale.height / 1.2);
    bridge.setDisplaySize(this.scale.width / 1.5, this.scale.height / 1.5);

    background.setOrigin(0.5, 0.5);
    bamboo.setOrigin(0.5, 0.4);
    bridge.setOrigin(0.5, 0.25);

    background.setPosition(this.scale.width / 2, this.scale.height / 2);
    bamboo.setPosition(this.scale.width / 2, this.scale.height / 2);
    bridge.setPosition(this.scale.width / 2, this.scale.height / 2);
  };
}

export default Demo;
