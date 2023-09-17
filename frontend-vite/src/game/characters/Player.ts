import * as Phaser from 'phaser';
import type { Enemy } from './Enemy';

// Define a type or interface for cursors
export interface Cursors {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  click: Phaser.Input.Pointer;
  // Add other keys as needed
}

export class Player extends Phaser.GameObjects.Sprite {
  inCombat: boolean = false;
  hp: number = 10000;
  attackRange: number = 100;

  // Implement your attack logic here, e.g., applying damage to the enemy
  attack(enemy: Enemy, damageAmount: number) {
    enemy.takeDamage(damageAmount);
    console.log('enemy hp:', enemy.hp);
  }

  takeDamage(damageAmount: number) {
    this.hp -= damageAmount;
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    // Add the player to the scene
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setScale(2);
    this.flipX = true;

    /*     // Set up player animations
    scene.anims.create({
      key: 'player_walk',
      frames: scene.anims.generateFrameNumbers('player', {
        start: 1,
        end: 24
      }),
      frameRate: 20,
      repeat: -1 // Repeat indefinitely
    });

    scene.anims.create({
      key: 'player_attack',
      frames: scene.anims.generateFrameNumbers('player', {
        start: 56,
        end: 120
      }),
      frameRate: 20
    }); */

    /*     // Set the player's initial animation
    this.play('player_walk'); */

    // player properties
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(40, 40);
  }
}
