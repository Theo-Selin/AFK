import { CST } from "../CST";
import Phaser from "phaser";

const AssetKeys = {
  LAYER_11: "layer_11",
  LAYER_10: "layer_10",
  LAYER_9: "layer_9",
  LAYER_8: "layer_8",
  LAYER_7: "layer_7",
  LAYER_6: "layer_6",
  LAYER_5: "layer_5",
  LAYER_4: "layer_4",
  LAYER_3: "layer_3",
  LAYER_2: "layer_2",
  LAYER_1: "layer_1",
};

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.GAME });
  }

  private layer_1!: Phaser.GameObjects.TileSprite;
  private layer_2!: Phaser.GameObjects.TileSprite;
  private layer_3!: Phaser.GameObjects.TileSprite;
  private layer_4!: Phaser.GameObjects.TileSprite;
  private layer_5!: Phaser.GameObjects.TileSprite;
  private layer_6!: Phaser.GameObjects.TileSprite;
  private layer_7!: Phaser.GameObjects.TileSprite;
  private layer_8!: Phaser.GameObjects.TileSprite;
  private layer_9!: Phaser.GameObjects.TileSprite;
  private layer_10!: Phaser.GameObjects.TileSprite;
  private layer_11!: Phaser.GameObjects.TileSprite;

  preload = () => {
    this.load.image(
      AssetKeys.LAYER_1,
      "../../../assets/backgrounds/forest/forest1.png"
    );
    this.load.image(
      AssetKeys.LAYER_2,
      "../../../assets/backgrounds/forest/forest2.png"
    );
    this.load.image(
      AssetKeys.LAYER_3,
      "../../../assets/backgrounds/forest/forest3.png"
    );
    this.load.image(
      AssetKeys.LAYER_4,
      "../../../assets/backgrounds/forest/forest4.png"
    );
    this.load.image(
      AssetKeys.LAYER_5,
      "../../../assets/backgrounds/forest/forest5.png"
    );
    this.load.image(
      AssetKeys.LAYER_6,
      "../../../assets/backgrounds/forest/forest6.png"
    );
    this.load.image(
      AssetKeys.LAYER_7,
      "../../../assets/backgrounds/forest/forest7.png"
    );
    this.load.image(
      AssetKeys.LAYER_8,
      "../../../assets/backgrounds/forest/forest8.png"
    );
    this.load.image(
      AssetKeys.LAYER_9,
      "../../../assets/backgrounds/forest/forest9.png"
    );
    this.load.image(
      AssetKeys.LAYER_10,
      "../../../assets/backgrounds/forest/forest10.png"
    );
    this.load.image(
      AssetKeys.LAYER_11,
      "../../../assets/backgrounds/forest/forest11.png"
    );
  };

  create = () => {
    const { width, height } = this.scale;

    this.layer_1 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_1
    );

    this.layer_2 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_2
    );

    this.layer_3 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_3
    );

    this.layer_4 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_4
    );

    this.layer_5 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_5
    );

    this.layer_6 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_6
    );

    this.layer_7 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_7
    );

    this.layer_8 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_8
    );

    this.layer_9 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_9
    );

    this.layer_10 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_10
    );

    this.layer_11 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_11
    );
  };

  update = () => {
    this.layer_2.tilePositionX += 0.05;
    this.layer_3.tilePositionX += 0.1;
    this.layer_4.tilePositionX += 0.15;
    this.layer_5.tilePositionX += 0.2;
    this.layer_6.tilePositionX += 0.25;
    this.layer_7.tilePositionX += 0.3;
    this.layer_8.tilePositionX += 0.35;
    this.layer_9.tilePositionX += 0.4;
    this.layer_10.tilePositionX += 0.45;
    this.layer_11.tilePositionX += 1;
  };
}
