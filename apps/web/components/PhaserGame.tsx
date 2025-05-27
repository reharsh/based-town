"use client";
import React, { useEffect, useRef, useState } from 'react';


const phaserGame = () => {
    const gameRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        const loadPhaser = async () => {
        const response = await fetch('http://localhost:3001/ai/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: 'world war 2' }),
        });
        const json = await response.json();
        console.log("json: ",json.object.quizzes)
        const quizData = json.object.quizzes;
        console.log("quizData: ", quizData);

        const Phaser = await import('phaser');
        class MainScene extends Phaser.Scene {
          private socket!: WebSocket;
          private otherPlayers: Map<string, Phaser.GameObjects.Sprite> = new Map();
          camera!: Phaser.Cameras.Scene2D.Camera;
          background!: Phaser.GameObjects.Image;
          player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
          cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
          clientId!: string;
          dialogShown!: boolean;
          dialogBox!: Phaser.GameObjects.Text;
          private quizzes: any[];
          private dialogZones: Phaser.Types.Physics.Arcade.ImageWithStaticBody[] = [];
          private currentQuiz: any;
  
          constructor(quizzes: any[]) {
            super('MainScene');
            this.quizzes = quizzes;
          }
  
          preload() {
            this.load.image('background', '/100xschool.png');
            this.load.spritesheet('player_idle', '/Adam_idle_anim_16x16.png', {
                frameWidth: 16,
                frameHeight: 32,
            })
            this.load.spritesheet('player_walk', '/Adam_run_16x16.png', {
                frameWidth: 16,
                frameHeight: 32,
            })
            this.load.image('pixel', '/pixel.png');
            this.load.spritesheet('other_player', '/spr_idle_strip9.png', {
              frameWidth: 96,
              frameHeight: 64,
          })

          this.load.spritesheet('chests', '/chests.png', {
            frameWidth: 24,
            frameHeight: 24,
          })
          console.log("this quizzes in scene: ",this.quizzes)
        }
  
          create() {
            this.camera = this.cameras.main;
            this.camera.setBackgroundColor(0x000000);
            this.cursors = this.input.keyboard!.createCursorKeys();
            this.background = this.add.image(0, 0, 'background').setOrigin(0, 0);
            this.player = this.physics.add.sprite(400, 400, 'player').setOrigin(0.5, 0.5);
            console.log("Total frames:", this.textures.get('player_idle').frameTotal);
            this.player.setScale(2); // make it visibly larger
            this.player.setCollideWorldBounds(true);

            this.socket = new WebSocket(`ws://localhost:8080`)

            this.socket.addEventListener('open', () => {
              const existingClientId = localStorage.getItem('clientId') || crypto.randomUUID();
              localStorage.setItem('clientId', existingClientId);
              this.clientId = existingClientId;

            
              this.socket.send(JSON.stringify({ type: 'join', clientId: existingClientId }));
            });

            this.socket.addEventListener('message',async (event)=>{
              const data = await event.data.text()
              console.log("eventn: ",data)
              const {type, id, x, y} = JSON.parse(data)
              console.log("typppp: ",type)
              if (type==="move"){
                this.updateOtherPlayer(id, x, y)
              }
            })

            const ground = this.physics.add.staticImage(400, 568, "pixel")
            .setDisplaySize(400, 400) // size matches where your ground visually is in the background
            .setVisible(false) // hides the collider rectangle
            .refreshBody();
            
            this.anims.create({
              key: 'idle',
              frames: this.anims.generateFrameNumbers('player_idle', { start: 18, end: 24 }),
              frameRate: 10,
              repeat: -1,
            });

            this.anims.create({
              key: 'right',
              frames: this.anims.generateFrameNumbers('player_walk', { start: 0, end: 5 }),
              frameRate: 10,
              repeat: -1,
            });

            this.anims.create({
              key: 'left',
              frames: this.anims.generateFrameNumbers('player_walk', { start: 12, end: 17 }),
              frameRate: 10,
              repeat: -1,
            });

            this.anims.create({
              key: 'up',
              frames: this.anims.generateFrameNumbers('player_walk', { start: 6, end: 11 }),
              frameRate: 10,
              repeat: -1,
            });

            this.anims.create({
              key: 'down',
              frames: this.anims.generateFrameNumbers('player_walk', { start: 18, end: 24 }),
              frameRate: 10,
              repeat: -1,
            });
            
            this.player.anims.play('idle');

            this.dialogZones = [];

            // Create dialog box first
            this.dialogBox = this.add.text(200, 50, '', {
              fontSize: '20px',
              color: '#ffffff',
              backgroundColor: '#000000',
              padding: { x: 10, y: 5 }
            })
            .setScrollFactor(0)
            .setDepth(1000)
            .setVisible(false);

            for (const quiz of this.quizzes) {
              const zone = this.physics.add.staticImage(quiz.position.x, quiz.position.y, 'chests')
                .setDisplaySize(100, 100)
              this.dialogZones.push(zone);
              console.log(this.dialogZones.length)
            
              this.physics.add.overlap(this.player, zone, () => {
                if (!this.dialogShown) {
                  this.dialogShown = true;
                  this.dialogBox.setText(`You found quiz: "${quiz.level}"! Press E to start.`)
                    .setVisible(true);
                  // Store which quiz we're interacting with if needed
                  this.currentQuiz = quiz;
                }
              });
            }
          }

          update(time: number, delta: number): void {
            const speed = 200;
            let moving: 'left' | 'right' | 'up' | 'down' | null = null;
            if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed);
            moving = 'left';
            } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed);
            moving = 'right';
            }

            if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed/2);
            moving = 'up';
            } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed/2);
            moving = 'down';
            }

            if (this.cursors?.space?.isDown && this.player.body.touching.down) {
              this.player.setVelocityY(-300); // jump up
            }

            // play animation when moving
            if (moving) {
            if (this.player.anims.getName() != moving) {
                this.player.anims.play(moving);
            }

            // TODO: correct this condition, maybe merge with moving one?
            if(this.socket.readyState === WebSocket.OPEN){
              const data = {
                type: "move",
                id: this.clientId,
                x: this.player.x,
                y: this.player.y,
              }
              this.socket.send(JSON.stringify(data))
            }
            } else {
            this.player.setVelocity(0);
            this.player.anims.play('idle');
            this.player.setFrame(0); // show first frame when idle
            }


            if (this.dialogShown && this.input.keyboard?.addKey('E')?.isDown) {
              this.dialogBox.setVisible(false);
              this.dialogShown = false;
            
              if (this.currentQuiz) {
                // Do something with this.currentQuiz
                console.log("Starting quiz: ", this.currentQuiz);
              }
            }
          }

          updateOtherPlayer(id: string, x: number, y: number) {
            console.log("otherplayers: ",this.otherPlayers)
            let otherPlayer = this.otherPlayers.get(id);
            console.log("hello")
            if(!otherPlayer){
              otherPlayer = this.add.sprite(x,y,'other_player');
              this.anims.create({
                key: 'idle_goblin',
                frames: this.anims.generateFrameNumbers('other_player', { start: 0, end: 8 }),
                frameRate: 10,
                repeat: -1,
              });
              if(otherPlayer){
                console.log("other player is addedd.....")
              }
              this.otherPlayers.set(id, otherPlayer)
            }
            else{
              otherPlayer.setPosition(x,y)
              otherPlayer.anims.play('idle_goblin')
            }
          }

        }
  
        const config: Phaser.Types.Core.GameConfig = {
          type: Phaser.AUTO,
          width: 1000,
          height: 800,
          backgroundColor: '#000000',
          scene: new MainScene(quizData),
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