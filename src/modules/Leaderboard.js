export default class Leaderboard {
  constructor() {
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
  }

  postScore(name, score) {
    const endpoint = 'games/hZNLe8ziB8YIZFe3yB6c/scores/';
    fetch(this.url + endpoint, {
      mode: 'cors',
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        user: name,
        score,
      }), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json())
      .catch((error) => error)
      .then((response) => response);
  }

  getScores() {
    const endpoint = 'games/hZNLe8ziB8YIZFe3yB6c/scores/';

    return fetch(this.url + endpoint, {
      mode: 'cors',
      method: 'GET',
    })
      .then((res) => res.json())
      .catch((err) => err);
  }
}
