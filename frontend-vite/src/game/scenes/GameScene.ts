import { CST } from '../CST';
import Phaser from 'phaser';
import { Character } from '../characters/Character';
import type { Cursors } from '../characters/Character';

import forest1 from '@/assets/sprites/forest/forest1.png';
import forest2 from '@/assets/sprites/forest/forest2.png';
import forest3 from '@/assets/sprites/forest/forest3.png';
import forest4 from '@/assets/sprites/forest/forest4.png';
import forest5 from '@/assets/sprites/forest/forest5.png';
import forest6 from '@/assets/sprites/forest/forest6.png';
import forest7 from '@/assets/sprites/forest/forest7.png';
import forest8 from '@/assets/sprites/forest/forest8.png';
import forest9 from '@/assets/sprites/forest/forest9.png';
import forest10 from '@/assets/sprites/forest/forest10.png';
import forest11 from '@/assets/sprites/forest/forest11.png';

import character from '@/assets/sprites/characters/redhood.png';

const AssetKeys = {
  LAYER_11: 'layer_11',
  LAYER_10: 'layer_10',
  LAYER_9: 'layer_9',
  LAYER_8: 'layer_8',
  LAYER_7: 'layer_7',
  LAYER_6: 'layer_6',
  LAYER_5: 'layer_5',
  LAYER_4: 'layer_4',
  LAYER_3: 'layer_3',
  LAYER_2: 'layer_2',
  LAYER_1: 'layer_1'
};

export class GameScene extends Phaser.Scene {
  cursors!: Cursors;

  handleCharacterAnimation = () => {
    // Assuming you have defined 'cursors' to handle input
    const cursors = this.input.keyboard?.createCursorKeys();

    // Character movement logic
    if (cursors?.right.isDown) {
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

      // Adjust character's velocity, physics, etc. as needed
    } else {
      return;
    }
  };

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

  private character: Character | null = null;

  preload = () => {
    this.load.image(AssetKeys.LAYER_1, forest1);
    this.load.image(AssetKeys.LAYER_2, forest2);
    this.load.image(AssetKeys.LAYER_3, forest3);
    this.load.image(AssetKeys.LAYER_4, forest4);
    this.load.image(AssetKeys.LAYER_5, forest5);
    this.load.image(AssetKeys.LAYER_6, forest6);
    this.load.image(AssetKeys.LAYER_7, forest7);
    this.load.image(AssetKeys.LAYER_8, forest8);
    this.load.image(AssetKeys.LAYER_9, forest9);
    this.load.image(AssetKeys.LAYER_10, forest10);
    this.load.image(AssetKeys.LAYER_11, forest11);

    this.load.spritesheet('character', character, {
      frameWidth: 112,
      frameHeight: 133
    });
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

    this.character = new Character(this, 200, 400);

    this.layer_11 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_11
    );
  };

  update = () => {
    this.handleCharacterAnimation();

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
