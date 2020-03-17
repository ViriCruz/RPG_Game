import 'regenerator-runtime'

export default class Leaderboard {
  constructor() {
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    this.endpoint = 'games/JcJCxdFAUxhycd7ygOqt/scores/'
  }

  async loadScores() {
    const response = await fetch(this.url + this.endpoint, {
      mode: 'cors'
    })
    if (response.ok) return response.json();

    throw new Error(response.status);
  }

  async postScore(score) {
    const response = await fetch(this.url + this.endpoint, {
      mode: 'cors',
      method: 'POST', // or 'PUT'
      body: JSON.stringify(score), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) return response.json();

    throw new Error(response.status);
  }

  bestPlayers(data) {
    return data.result.sort((score1, score2) => score1.score < score2.score ? 1 : -1)
    .filter((score, i) => i < 10)
  }
}
