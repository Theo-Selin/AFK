import { CST } from "../CST.js";
import Phaser from "phaser";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU });
  }

  create() {
    this.scene.start(CST.SCENES.MENU);
  }
}
