import * as Phaser from 'phaser';
import type { Character } from './Character';

export class Enemy extends Phaser.GameObjects.Sprite {
  inCombat: boolean = false;
  hp: number = 410;
  attackRange: number = 100;

  enterCombatState() {
    this.inCombat = true;
    this.play('enemy_attack', true);
    if (this.hp <= 0) {
      this.exitCombatState();
    }
  }

  exitCombatState() {
    this.play('enemy_death', true);
    setTimeout(() => {
      this.inCombat = false;
      this.destroy(true);
    }, 200);
  }

  // Implement your attack logic here, e.g., applying damage to the character
  attack(character: Character, attackRange: number, damageAmount: number) {
    if (
      Phaser.Math.Distance.Between(this.x, this.y, character.x, character.y) <=
      attackRange
    ) {
      character.takeDamage(damageAmount);
    }
  }

  takeDamage(damageAmount: number) {
    this.hp -= damageAmount;
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

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'enemy');

    // Add the enemy to the scene
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setScale(2);
    this.flipX = false;

    // Set up enemy animations
    if (!this.anims.exists('enemy_walk')) {
      scene.anims.create({
        key: 'enemy_walk',
        frames: scene.anims.generateFrameNumbers('enemy', {
          start: 0,
          end: 0
        }),
        frameRate: 20,
        repeat: -1 // Repeat indefinitely
      });
    }

    if (!this.anims.exists('enemy_attack')) {
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

    if (!this.anims.exists('enemy_death')) {
      scene.anims.create({
        key: 'enemy_death',
        frames: scene.anims.generateFrameNumbers('enemy', {
          start: 121,
          end: 131
        }),
        frameRate: 20,
        repeat: -1 // Repeat indefinitely
      });
    }

    // Set the enemy's initial animation
    this.play('enemy_walk');

    // Character properties
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(60, 60);
  }
}
