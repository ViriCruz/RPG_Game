/* global Phaser
no-undef: off */
import Leaderboard from '../modules/Leaderboard';
import Score from '../modules/Score';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Leaderboard' });
  }

  async create() {
    this.title = this.add.text(80, 20, 'Leaderboard', { fontSize: '12px', fill: '#fff', fontFamily: 'Arial' });
    this.leaderboard = new Leaderboard();
    this.score = new Score();
    this.score.checkScore();
    const points = this.score.getScore();
    const username = this.score.getUser();
    this.userScore = {
      user: username,
      score: points,
    };

    await this.leaderboard.postScore(this.userScore);
    this.data = await this.leaderboard.loadScores();

    this.best10 = this.bestPlayers();

    this.displayBestPlayers();
  }

  displayBestPlayers() {
    let { y } = this.title;
    this.best10.forEach(player => {
      y += 20;
      this.add.text(80, y, player.user, { fontSize: '12px', fill: '#fff', fontFamily: 'Arial' });
      this.add.text(160, y, player.score, { fontSize: '12px', fill: '#fff', fontFamily: 'Arial' });
    });
  }

  bestPlayers() {
    return this.data.result.sort((score1, score2) => (score1.score < score2.score ? 1 : -1))
      .filter((score, i) => i < 10);
  }
}
