import * as Phaser from 'phaser';

// Define a type or interface for cursors
export interface Cursors {
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  // Add other keys as needed
}

export class Character extends Phaser.GameObjects.Sprite {
  speed: number;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'character');

    // Add the character to the scene
    scene.add.existing(this);

    this.setScale(2);
    this.flipX = true;

    // Set up character animations
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('character', {
        start: 1,
        end: 24
      }),
      frameRate: 30,
      repeat: -1 // Repeat indefinitely
    });

    scene.anims.create({
      key: 'walk',
      frames: scene.anims.generateFrameNumbers('character', {
        start: 1,
        end: 24
      }),
      frameRate: 20,
      repeat: -1 // Repeat indefinitely
    });

    // Set the character's initial animation
    this.play('idle');

    // Character properties
    this.speed = 150; // Adjust as needed
  }

  setVelocityX = (velocityX: number) => {
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(velocityX);
  };

  setVelocityY = (velocityY: number) => {
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(velocityY);
  };
}
