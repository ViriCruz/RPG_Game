import Phaser from 'phaser';
import PlayerCharacter from '../modules/PlayerCharacter';
import Enemy from '../modules/Enemy';
import Score from '../modules/Score'

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BattleScene' });
  }

  create() {
    this.score = new Score()
    this.playerHp = this.add.text(5, 5, ``, { fontSize: '12px', fill: '#000' });
    this.enemyHp = this.add.text(5, 20, ``, { fontSize: '12px', fill: '#000' });
    // make background green
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.startBattle();
    // on wake event we call startBattle too
    this.sys.events.on('wake', this.startBattle, this);
  }

  nextTurn() {
    // if we have victory or game over
    if (this.checkEndBattle()) {
      this.endBattle();
      return;
    }
    do {
      // currently active unit
      this.index += 1;
      // if there are no more units, we start again from the first one
      if (this.index >= this.units.length) {
        this.index = 0;
      }
    } while (!this.units[this.index].living);
    // if its the player hero
    if (this.units[this.index] instanceof PlayerCharacter) {
      // we need the player to select action then enemy
      this.events.emit('PlayerSelect', this.index);
    } else { // else if its enemy unit
      // pick random living hero to be attacked
      let r;
      do {
        r = Math.floor(Math.random() * this.heroes.length);
      } while (!this.heroes[r].living);
      // call the enemy's attack function
      this.units[this.index].attack(this.heroes[r]);
      this.cameras.main.shake(300);
      this.playerHp.setText(`player hp ${this.heroes[r].getHp()}`)
      // add timer for the next turn, so will have smooth gameplay
      this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
    }
  }

  receivePlayerSelection(action, target) {
    if (action === 'attack') {
      this.units[this.index].attack(this.enemies[target]);
      this.cameras.main.shake(300);
      this.enemyHp.setText(`mage hp ${this.enemies[target].getHp()}`)
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  }

  exitBattle() {
    this.scene.sleep('UIScene');
    this.scene.switch('WorldScene');
  }

  wake() {
    this.scene.run('UIScene');
    this.time.addEvent({ delay: 2000, callback: this.exitBattle, callbackScope: this });
  }

  checkEndBattle() {
    let victory = true;
    // if all enemies are dead we have victory
    for (let i = 0; i < this.enemies.length; i += 1) {
      if (this.enemies[i].living) {
        victory = false;
      }
    }
    let gameOver = true;
    for (let i = 0; i < this.heroes.length; i += 1) {
      if (this.heroes[i].living) {
        gameOver = false;
      }
    }
    if (victory) {
       //Add score
      this.score.checkScore()
      this.score.addPoints()
    }
    return victory || gameOver;
  }

  endBattle() {
    // clear state, remove sprites
    this.heroes.length = 0;
    this.enemies.length = 0;
    for (let i = 0; i < this.units.length; i += 1) {
      // link item
      this.units[i].destroy();
    }
    this.units.length = 0;
   
    // sleep the UI
    this.scene.sleep('UIScene');
    // return to WorldScene and sleep current BattleScene
    this.scene.switch('WorldScene');
  }

  startBattle() {
    // player character - warrior
    const warrior = new PlayerCharacter(this, 250, 50, 'warrior', 4, 'Warrior', 100, 20);
    this.playerHp.setText(`player hp ${warrior.getHp()}`)
    this.add.existing(warrior);
    this.add.existing(this.playerHp)

    // player character - mage
    // const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
    // this.add.existing(mage);

    const mage = new Enemy(this, 50, 50, 'mage', null, 'Mage', 50, Phaser.Math.RND.between(3, warrior.getHp() - 1));
    this.enemyHp.setText(`mage hp ${mage.getHp()}`)
    this.add.existing(mage);
    this.add.existing(this.enemyHp)
    // const dragonOrange = new Enemy(this, 50, 100, 'dragonOrange', null, 'Dragon2', 50, 3);
    // this.add.existing(dragonOrange);

    // array with heroes
    this.heroes = [warrior];
    // array with enemies
    this.enemies = [mage];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.index = -1; // currently active unit

    this.scene.run('UIScene');
  }
}
