import 'phaser'
import Leaderboard from '../modules/Leaderboard'

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Leaderboard' })
  }

  create() {
    this.title = this.add.text(80, 20, 'Leaderboard', { fontSize: '12px', fill: '#fff', fontFamily: 'Arial' });
    this.leaderboard = new Leaderboard()
    this.leaderboard.getScores()
    .then(response => {
      let y = this.title.y
      response.result.forEach( score => {
        y += 20
        this.add.text(80, y, score.user, { fontSize: '12px', fill: '#fff', fontFamily: 'Arial' })
        this.add.text(160, y, score.score, { fontSize: '12px', fill: '#fff', fontFamily: 'Arial' })
      })
    })
    .catch(error => console.error('Error:', error))
  }
}