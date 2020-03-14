import Phaser from 'phaser';
import tilesImg from '../assets/map/spritesheet.png';
import mapImg from '../assets/map/map.json';
import warrior from '../assets/warrior.png'
import townfolk from '../assets/townfolk.png'
import mage from '../assets/mage-SWEN.png'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    
    // map tiles
    this.load.image('tiles', tilesImg);
    // map in json format
    this.load.tilemapTiledJSON('map', mapImg);
   
    this.load.spritesheet('warrior', 
      warrior,
      { frameWidth: 16, frameHeight: 18 }
    );
    this.load.spritesheet('townfolk', 
      townfolk,
      { frameWidth: 16, frameHeight: 18 }
    );
    this.load.spritesheet('mage',
      mage,
      { frameWidth:32, frameHeight: 32}
    )
  }

  create() {
    this.scene.start('WorldScene');
  }
}
