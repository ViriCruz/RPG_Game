import Phaser from 'phaser';
import BootScene from './scenes/BootScene';
import WorldScene from './scenes/WorldScene';
import BattleScene from './scenes/BattleScene';
import UIScene from './scenes/UIScene';
import LeaderboardScene from './scenes/LeaderboardScene'
import Leaderboard from './modules/Leaderboard'


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

const leaderboard = new Leaderboard()
// leaderboard.postGame()
// leaderboard.postScore('new user', 5)
// leaderboard.getScores()
// .then(resp => console.log(resp.result.sort()))
// .catch(error => console.log(error)
// )
// console.log(leaderboard.scores);


const game = new Phaser.Game(config);
export default game;
