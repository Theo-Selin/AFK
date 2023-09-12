import { CST } from "../CST.js";
import Phaser from "phaser";

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  create() {
    this.scene.start(CST.SCENES.MENU);
  }
}
