/* global Phaser
no-undef: off */
import Leaderboard from '../modules/Leaderboard';
import Score from '../modules/Score';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Leaderboard' });
  }

  create() {
    this.title = this.add.text(80, 20, 'Leaderboard', { fontSize: '12px', fill: '#fff', fontFamily: 'Arial' });
    this.leaderboard = new Leaderboard();
    this.score = new Score();
    this.score.checkScore();
    const userScore = this.score.getScore();
    const user = this.score.getUser();
    this.leaderboard.postScore(user, userScore);

    this.leaderboard.getScores()
      .then((response) => {
        setTimeout(() => {
          let { y } = this.title;
          response.result.forEach((score) => {
            y += 20;
            this.add.text(80, y, score.user, { fontSize: '12px', fill: '#fff', fontFamily: 'Arial' });
            this.add.text(160, y, score.score, { fontSize: '12px', fill: '#fff', fontFamily: 'Arial' });
          });
        }, 2000);
      })
      .catch((error) => error);
  }
}
