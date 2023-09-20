import { CST } from '../CST';
import Phaser from 'phaser';
import { Player } from '../characters/Player';
import { Enemy } from '../characters/Enemy';
import type { Cursors } from '../characters/Player';

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

import hit1 from '@/assets/sounds/sword/sword_clash.1.ogg';
import hit2 from '@/assets/sounds/sword/sword_clash.2.ogg';
import hit3 from '@/assets/sounds/sword/sword_clash.3.ogg';
import hit4 from '@/assets/sounds/sword/sword_clash.4.ogg';
import hit5 from '@/assets/sounds/sword/sword_clash.5.ogg';
import hit6 from '@/assets/sounds/sword/sword_clash.6.ogg';
import hit7 from '@/assets/sounds/sword/sword_clash.7.ogg';
import hit8 from '@/assets/sounds/sword/sword_clash.8.ogg';
import hit9 from '@/assets/sounds/sword/sword_clash.9.ogg';
import hit10 from '@/assets/sounds/sword/sword_clash.10.ogg';

import crit1 from '@/assets/sounds/hits/hit19.mp3';

import player from '@/assets/sprites/characters/redhood.png';
import enemy from '@/assets/sprites/characters/redhood.png';

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
  LAYER_1: 'layer_1',
  HIT_1: 'hit1',
  HIT_2: 'hit2',
  HIT_3: 'hit3',
  HIT_4: 'hit4',
  HIT_5: 'hit5',
  HIT_6: 'hit6',
  HIT_7: 'hit7',
  HIT_8: 'hit8',
  HIT_9: 'hit9',
  HIT_10: 'hit10',
  CRIT_1: 'crit1'
};

export class GameScene extends Phaser.Scene {
  cursors!: Cursors;

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

  private hit_1!: Phaser.Sound.BaseSound;
  private hit_2!: Phaser.Sound.BaseSound;
  private hit_3!: Phaser.Sound.BaseSound;
  private hit_4!: Phaser.Sound.BaseSound;
  private hit_5!: Phaser.Sound.BaseSound;
  private hit_6!: Phaser.Sound.BaseSound;
  private hit_7!: Phaser.Sound.BaseSound;
  private hit_8!: Phaser.Sound.BaseSound;
  private hit_9!: Phaser.Sound.BaseSound;
  private hit_10!: Phaser.Sound.BaseSound;
  private hit_11!: Phaser.Sound.BaseSound;

  private crit_1!: Phaser.Sound.BaseSound;

  private player!: Player | null;
  private enemy!: Enemy | null;

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

    this.load.audio(AssetKeys.HIT_1, hit1);
    this.load.audio(AssetKeys.HIT_2, hit2);
    this.load.audio(AssetKeys.HIT_3, hit3);
    this.load.audio(AssetKeys.HIT_4, hit4);
    this.load.audio(AssetKeys.HIT_5, hit5);
    this.load.audio(AssetKeys.HIT_6, hit6);
    this.load.audio(AssetKeys.HIT_7, hit7);
    this.load.audio(AssetKeys.HIT_8, hit8);
    this.load.audio(AssetKeys.HIT_9, hit9);
    this.load.audio(AssetKeys.HIT_10, hit10);

    this.load.audio(AssetKeys.CRIT_1, crit1);

    this.load.spritesheet('player', player, {
      frameWidth: 112,
      frameHeight: 133
    });

    this.load.spritesheet('enemy', enemy, {
      frameWidth: 112,
      frameHeight: 133
    });
  };

  create = () => {
    const { width, height } = this.scale;

    // Create the mute button
    const muteButton = this.add
      .text(200, 200, 'Mute', {
        color: '#ffffff',
        fontSize: '20px'
      })
      .setInteractive();
    muteButton.setDepth(1);

    // Toggle mute functionality
    const toggleMute = () => {
      this.sound.mute = !this.sound.mute; // Toggle mute property
      muteButton.setText(this.sound.mute ? 'Unmute' : 'Mute');
    };

    // Add click event to the mute button
    muteButton.on('pointerdown', () => {
      // Ensure audio-related actions are triggered by user interaction
      toggleMute();
    });

    // Set up animations
    if (!this.anims.exists('walk')) {
      this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player', {
          start: 1,
          end: 24
        }),
        frameRate: 20,
        repeat: -1 // Repeat indefinitely
      });
    }

    if (!this.anims.exists('attack')) {
      this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('player', {
          start: 56,
          end: 120
        }),
        frameRate: 20,
        repeat: -1 // Repeat indefinitely
      });
    }

    if (!this.anims.exists('death')) {
      this.anims.create({
        key: 'death',
        frames: this.anims.generateFrameNumbers('player', {
          start: 121,
          end: 127
        }),
        frameRate: 20,
        repeat: -1
      });
    }

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

    //WORLD //
    this.physics.world.setBounds(0, 0, width, height);

    // player //
    this.player = new Player(this, 200, 400);
    this.player.play('walk', true);

    // ENEMY //
    this.time.addEvent({
      delay: 10000,
      callback: () => {
        const enemy = new Enemy(this, 800, 400);
        enemy.enterFromOutside(4500);
        enemy.play('walk', true);
        this.physics.add.collider(
          this.player!,
          enemy,
          (player, enemy) => {
            this.playerEnemyCollision(player as Player, enemy as Enemy);
          },
          undefined,
          this
        );
      },
      loop: true
    });

    // INTERACTION //
    this.physics.world.setBounds(0, 0, width, height);

    this.layer_11 = this.add.tileSprite(
      628 / 2,
      493 / 2,
      width,
      height,
      AssetKeys.LAYER_11
    );
  };

  playerEnemyCollision = (player: Player, enemy: Enemy) => {
    const timings = [350, 350, 650, 650, 825, 450];

    if (enemy.hp > 0) {
      player.inCombat = true;
      enemy.inCombat = true;
      player.play('attack', true);
      enemy.play('attack', true);
      player.attack(enemy, timings, 0, 0.2);
      enemy.attack(player, 1);
      enemy.enableBody(false);
    }
  };

  update = () => {
    if (!this.player?.inCombat) {
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
    }
  };
}
