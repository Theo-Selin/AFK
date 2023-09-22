import * as Phaser from 'phaser';
import type { Player } from './Player';

export class Enemy extends Phaser.GameObjects.Sprite {
  inCombat: boolean = false;
  hp: number = 410;
  attackRange: number = 100;

  // Implement your attack logic here, e.g., applying damage to the player
  attack(player: Player, damageAmount: number) {
    player.takeDamage(damageAmount);
    /*     console.log('player hp:', player.hp);
     */
  }

  takeDamage(damageAmount: number) {
    this.hp -= damageAmount;
  }

  combatBounce(distance: number, duration: number) {
    // Set the sprite's tint to white
    this.setTintFill(0xffffff);
    this.scene.tweens.add({
      targets: this,
      fill: 0xffffff,
      duration: duration / 4,
      onComplete: () => {
        this.clearTint();
      }
    });

    // Create a tween for the bounce effect
    this.scene.tweens.add({
      targets: this,
      x: this.x + distance, // Move the sprite up
      duration: duration / 2,
      ease: 'Linear',
      yoyo: true, // Play the tween in reverse
      onComplete: () => {
        // Ensure the sprite is back to its original position
        this.x = 250;
      }
    });
  }

  enterFromOutside(duration: number) {
    // Create a tween to move the enemy onto the screen
    const tween = this.scene.tweens.add({
      targets: this,
      x: 250,
      duration: duration,
      ease: 'Linear',
      onComplete: () => {
        tween.remove();
      }
    });
  }

  enableBody(enabled: boolean) {
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.enable = enabled;
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'enemy');

    // Add the enemy to the scene
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setScale(2);
    this.flipX = false;

    /*     // Set up enemy animations
    if (!scene.anims.exists('enemy_walk')) {
      scene.anims.create({
        key: 'enemy_walk',
        frames: scene.anims.generateFrameNumbers('enemy', {
          start: 1,
          end: 24
        }),
        frameRate: 20,
        repeat: -1 // Repeat indefinitely
      });
    }

    if (!scene.anims.exists('enemy_attack')) {
      scene.anims.create({
        key: 'enemy_attack',
        frames: scene.anims.generateFrameNumbers('enemy', {
          start: 56,
          end: 120
        }),
        frameRate: 10,
        repeat: -1 // Repeat indefinitely
      });
    }

    if (!scene.anims.exists('enemy_death')) {
      scene.anims.create({
        key: 'enemy_death',
        frames: scene.anims.generateFrameNumbers('enemy', {
          start: 121,
          end: 126
        }),
        frameRate: 20
      });
    }

    // Set the enemy's initial animation
    this.play('enemy_walk'); */

    // Player properties
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(20, 20);
  }
}
