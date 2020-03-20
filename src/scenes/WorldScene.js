import Phaser from 'phaser';
import Score from '../modules/Score';


export default class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' });
  }

  create() {
    // creates map
    this.score = new Score();
    this.score.checkScore();

    const map = this.make.tilemap({ key: 'map' });
    // creates tileset image
    const tiles = map.addTilesetImage('spritesheet', 'tiles');
    map.createStaticLayer('Grass', tiles, 0, 0);
    // create player avatar
    this.player = this.physics.add.sprite(50, 100, 'warrior', 8);


    this.npc = this.physics.add.sprite(100, 200, 'townfolk', 8);
    this.npc.immovable = true;
    this.npc.body.moves = false;
    this.npc.allowGravity = false;
    this.npc.body.gravity.x = 0;
    this.npc.body.gravity.y = 0;
    this.npc.body.velocity.x = 0;
    this.npc.body.velocity.y = 0;
    this.npc.body.enable = true;

    this.physics.add.collider(this.player, this.npc, this.showMission, null, this);
    this.scoreText = this.add.text(5, 5, `score: ${this.score.getScore()}`, { fontSize: '12px', fill: '#000' });
    this.mission = this.add.text(90, 190, '', { fontSize: '12px', fill: '#000', wordWrap: { width: 160, useAdvancedWrap: true } });
    this.mission.visible = false;

    // create world bounds so player stays within map borders
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    // player set to stay within borders
    this.player.setCollideWorldBounds(true);
    // process keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();
    // limit camera to stay within map boundaries
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // follow the player with camera
    this.cameras.main.startFollow(this.player);
    // prevent tiles bleeding (showing border lines) # TODO: this does not work

    // enemy animation
    this.anims.create({
      key: 'enemy',
      frames: this.anims.generateFrameNumbers('mage', { frames: [1, 0, 1, 2] }),
      frameRate: 5,
      repeat: -1,
    });

    // npc animation
    this.anims.create({
      key: 'npc',
      frames: this.anims.generateFrameNumbers('townfolk', { frames: [7, 6, 7, 8] }),
      frameRate: 5,
      repeat: -1,
    });

    // animation with 'left' key, same as 'right' as we use flipX in animations later
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('warrior', { frames: [4, 3, 4, 5] }),
      frameRate: 10,
      repeat: -1,
    });
    // animation with 'right' key
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('warrior', { frames: [4, 3, 4, 5] }),
      frameRate: 10,
      repeat: -1,
    });
    // animation with 'up' key
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('warrior', { frames: [1, 0, 1, 2] }),
      frameRate: 10,
      repeat: -1,
    });
    // animation with 'down' key
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('warrior', { frames: [7, 6, 7, 8] }),
      frameRate: 10,
      repeat: -1,
    });
    // creates collisions for player and obstacles

    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Sprite,
    });
    // create 30 spawns on the map
    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
      // params are x, y, width, height
      this.spawns.create(x, y, 'mage');
    }
    // make player and zones interact.. when player overlaps the zone
    // the onMeetEnemy method is called
    this.physics.add.overlap(
      this.player, this.spawns, this.onMeetEnemy, false, this,
    );

    this.sys.events.on('wake', this.wake, this);
  }

  animateEnemies() {
    this.spawns.children.iterate(spawn => {
      const child = spawn;
      child.play('enemy', true);
      child.immovable = true;
      child.body.moves = false;
      child.allowGravity = false;
      child.body.gravity.x = 0;
      child.body.gravity.y = 0;
      child.body.velocity.x = 0;
      child.body.velocity.y = 0;
      child.body.enable = true;
    });
  }

  showMission() {
    this.mission.visible = true;
    this.mission.setText('Your mission is to defeat all the enemies you can.');
  }


  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  }


  onMeetEnemy(player, spawn) {
    // move zone to another location
    const monster = spawn;
    monster.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    monster.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
    // add shake effect for battle start
    this.cameras.main.shake(300);
    this.input.stopPropagation();
    // switch to BattleScene
    this.scene.switch('BattleScene');
  }

  wake() {
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.up.reset();
    this.cursors.down.reset();
  }

  update() {
    this.animateEnemies();
    this.npc.anims.play('npc', true);
    this.score.checkScore();
    this.scoreText = this.add.text(5, 5, `score: ${this.score.getScore()}`, { fontSize: '12px', fill: '#000' });
    this.physics.add.collider(this.player, this.spawns);
    // set body velocity to 0
    this.player.body.setVelocity(0);
    // horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }
    // vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }
    // code for switching to correct animation
    if (this.cursors.left.isDown) {
      this.player.anims.play('left', true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play('right', true);
      this.player.flipX = false;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play('down', true);
    } else {
      this.player.anims.stop();
    }
  }
}
