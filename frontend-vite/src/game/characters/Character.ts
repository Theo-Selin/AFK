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

export class Character extends Phaser.GameObjects.Sprite {
  inCombat: boolean = false;
  hp: number = 100;
  attackRange: number = 100;

  enterCombatState() {
    this.inCombat = true;
    this.play('player_attack', true);
    setTimeout(() => {
      this.exitCombatState();
    }, 3200);
  }

  exitCombatState() {
    this.inCombat = false;
    this.play('player_walk', true);
  }

  // Implement your attack logic here, e.g., applying damage to the enemy
  attack(enemy: Enemy, attackRange: number, damageAmount: number) {
    if (
      Phaser.Math.Distance.Between(this.x, this.y, enemy.x, enemy.y) <=
      attackRange
    ) {
      enemy.takeDamage(damageAmount);
    }
  }

  takeDamage(damageAmount: number) {
    this.hp -= damageAmount;
  }
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'character');

    // Add the character to the scene
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setScale(2);
    this.flipX = true;

    // Set up character animations
    scene.anims.create({
      key: 'player_walk',
      frames: scene.anims.generateFrameNumbers('character', {
        start: 1,
        end: 24
      }),
      frameRate: 20,
      repeat: -1 // Repeat indefinitely
    });

    scene.anims.create({
      key: 'player_attack',
      frames: scene.anims.generateFrameNumbers('character', {
        start: 56,
        end: 120
      }),
      frameRate: 20
    });

    // Set the character's initial animation
    this.play('player_walk');

    // Character properties
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(60, 60);
  }
}
