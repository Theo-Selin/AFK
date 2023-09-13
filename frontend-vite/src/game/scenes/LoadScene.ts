import { CST } from "../CST.js";
import Phaser from "phaser";

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  preload = () => {
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff,
      },
    });

    /*     for (let i = 0; i < 100; i++) {
      this.load.spritesheet(
        `player${i}`,
        `../../../assets/spritesheets/player/player${i}.png`,
        {
          frameHeight: 32,
          frameWidth: 32,
        }
      );
    } */

    this.load.on("progress", (percent: number) => {
      loadingBar.fillRect(
        0,
        this.game.renderer.height / 2,
        this.game.renderer.width * percent,
        50
      );
    });

    this.load.on("complete", () => {
      /* this.scene.start(CST.SCENES.MENU); */
    });
  };

  create() {
    this.scene.start(CST.SCENES.MENU);
  }
}
