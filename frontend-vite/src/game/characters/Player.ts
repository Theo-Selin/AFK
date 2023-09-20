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

  attack(
    enemy: Enemy,
    attackTimings: number[],
    delay: number,
    critChance: number
  ) {
    const hitSounds = ['hit1'];
    const critSounds = ['crit1'];

    const triggerAttackSequence = (sequenceIndex: number) => {
      if (sequenceIndex < attackTimings.length) {
        const timing = attackTimings[sequenceIndex];
        const randomHitSoundKey = Phaser.Utils.Array.GetRandom(hitSounds);
        const randomHitSound = this.scene.sound.add(randomHitSoundKey);
        const randomCritSoundKey = Phaser.Utils.Array.GetRandom(critSounds);
        const randomCritSound = this.scene.sound.add(randomCritSoundKey);
        randomHitSound.setVolume(0.05);
        randomCritSound.setVolume(0.05);

        // Generate a random number between 0 and 1
        const randomValue = Math.random();

        // Check if the random number is below the critChance threshold
        if (randomValue < critChance) {
          if (randomCritSound.isPlaying) {
            randomCritSound.destroy();
          }
          this.screenShake(0.05, 50);
          this.screenFlash(500);
          randomCritSound.play();
          this.damage(enemy, 50 * 2); // Replace 1 with your damage amount
        } else {
          if (randomHitSound.isPlaying) {
            randomHitSound.destroy();
          }
          randomHitSound.play();
          this.damage(enemy, 50); // Replace 1 with your damage amount
        }

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

  // Function to shake the camera
  screenShake(intensity: number, duration: number) {
    // Calculate the initial camera position
    const initialShake = this.scene.cameras.main.zoom;

    // Create a tween to animate the camera shake
    this.scene.tweens.add({
      targets: this.scene.cameras.main,
      zoom: initialShake + intensity,

      ease: 'Linear',
      duration: duration,
      yoyo: true,
      repeat: 0,
      onComplete: () => {
        // Reset the camera to its initial position
        this.scene.cameras.main.setZoom(initialShake);
      }
    });
  }

  // Function to create a screen flash
  screenFlash(duration: number) {
    // Create a graphics object to draw the screen flash
    const graphics = this.scene.add.graphics();

    // Set the fill color and alpha (transparency) for the flash
    const flashColor = 0xffffff; // White
    const flashAlpha = 0.5; // Adjust this value for the desired transparency

    // Draw a rectangle covering the entire screen
    graphics.fillStyle(flashColor, flashAlpha);
    graphics.fillRect(
      0,
      0,
      this.scene.cameras.main.width,
      this.scene.cameras.main.height
    );

    // Add a tween to fade out the flash
    this.scene.tweens.add({
      targets: graphics,
      alpha: 0,
      ease: 'Linear',
      duration: duration,
      yoyo: false,
      repeat: 0,
      onComplete: () => {
        // Destroy the graphics object when the tween is complete
        graphics.destroy();
      }
    });
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
