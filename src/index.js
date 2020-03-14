import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import WorldScene from './scenes/WorldScene';
import BattleScene from './scenes/BattleScene';
import UIScene from './scenes/UIScene';
import LeaderboardScene from './scenes/LeaderboardScene'
import Dom from './modules/Dom'


export const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  dom: {
    createContainer: true
  },
  scene: [
    BootScene,
    WorldScene,
    BattleScene,
    LeaderboardScene,
    UIScene
  ],
};




const game = new Phaser.Game(config);

Dom().button.addEventListener('click', (e) => { 
  if(Dom().hidden){
    Dom().hidden.classList.replace('invisible', 'visible')
  }

  if(Dom().username.value !== '') {
    localStorage.setItem(Dom().username.value, 100)
    Dom().phaserGame.setAttribute('name', Dom().username.value)
  }
  e.preventDefault()
})

export default game;
