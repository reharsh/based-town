"use client";
import React, { useEffect, useRef } from 'react';


const phaserGame = () => {
    const gameRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        // Import Phaser dynamically inside the browser-only context
        const loadPhaser = async () => {
        const Phaser = await import('phaser');
  
        class MainScene extends Phaser.Scene {
          camera!: Phaser.Cameras.Scene2D.Camera;
          background!: Phaser.GameObjects.Image;
          player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
          cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  
          constructor() {
            super('MainScene');
          }
  
          preload() {
            this.load.image('background', '/background.png');
            this.load.spritesheet('player_idle', '/base_idle_strip9.png', {
                frameWidth: 96,
                frameHeight: 64,
            })
            this.load.spritesheet('player_walk', '/base_walk_strip8.png', {
                frameWidth: 96,
                frameHeight: 64,
            })
            this.load.image('pixel', '/pixel.png');
          }
  
          create() {
            this.camera = this.cameras.main;
            this.camera.setBackgroundColor(0x000000);
            this.cursors = this.input.keyboard!.createCursorKeys();
            this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
            this.player = this.physics.add.sprite(400, 400, 'player').setOrigin(0.5, 0.5);
            this.player.setScale(2); // make it visibly larger
            this.player.setCollideWorldBounds(true);

            const ground = this.physics.add.staticImage(400, 568, "pixel")
            .setDisplaySize(400, 400) // size matches where your ground visually is in the background
            .setVisible(false) // hides the collider rectangle
            .refreshBody();
            
            this.anims.create({
              key: 'idle',
              frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 8 }),
              frameRate: 10,
              repeat: -1,
            });

            this.anims.create({
              key: 'walk',
              frames: this.anims.generateFrameNumbers('player_walk', { start: 0, end: 8 }),
              frameRate: 10,
              repeat: -1,
            });
            
            this.player.anims.play('idle');
          }

          update(time: number, delta: number): void {
            const speed = 200;
            let moving = false;
            if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            this.player.setFlipX(true); // face left
            moving = true;
            } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            this.player.setFlipX(false); // face right
            moving = true;
            }

            if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed/2);
            moving = true;
            } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed/2);
            moving = true;
            }

            if (this.cursors?.space?.isDown && this.player.body.touching.down) {
              this.player.setVelocityY(-300); // jump up
            }

            // play animation when moving
            if (moving) {
            if (this.player.anims.getName() !== 'walk') {
                this.player.anims.play('walk');
            }
            } else {
            this.player.setVelocity(0);
            this.player.anims.play('idle');
            this.player.setFrame(0); // show first frame when idle
            }
          }
        }
  
        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.AUTO,
          width: 800,
          height: 800,
          backgroundColor: '#000000',
          scene: MainScene,
          parent: gameRef.current!,
          physics: {
            default: 'arcade',
            arcade: {
              gravity: { x: 0, y: 0},
              debug: false,
            },
          },
        };
  
        const game = new Phaser.Game(config);
  
        return () => {
          game.destroy(true);
        };
      };

       loadPhaser()
    },[])

    return <div ref={gameRef}></div>
}


export default phaserGame;