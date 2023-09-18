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

  damage(enemy: Enemy, damageAmount: number) {
    enemy.takeDamage(damageAmount);
    console.log('enemy hp:', enemy.hp);
  }

  attack(enemy: Enemy, attackTimings: number[], delay: number) {
    const triggerAttackSequence = (sequenceIndex: number) => {
      if (sequenceIndex < attackTimings.length) {
        const timing = attackTimings[sequenceIndex];
        this.damage(enemy, 50); // Replace 1 with your damage amount // Replace 100 with your shake intensity and 0.01 with your shake duration

        // Set up the timer for the next attack in the sequence
        this.scene.time.addEvent({
          delay: timing,
          callback: () => {
            triggerAttackSequence(sequenceIndex + 1);
          },
          loop: false
        });
      } else {
        // The sequence has finished; wait for the delay before starting the next sequence
        if (enemy.hp > 0) {
          this.scene.time.delayedCall(delay, () => {
            triggerAttackSequence(0); // Start the next sequence
          });
        } else {
          enemy.play('death', true);
          this.scene.time.addEvent({
            delay: 200,
            callback: () => {
              this.inCombat = false;
              this.play('walk', true);
              enemy.destroy();
            },
            loop: false
          });
        }
      }
    };
    // Start the first attack sequence
    triggerAttackSequence(0);
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