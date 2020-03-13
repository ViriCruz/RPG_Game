export default class Leaderboard {
  constructor() {
    this.leaderboard = []
    this.url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/'
  }

  postGame() {
    const endpoint = 'games/'
    fetch(this.url + endpoint, {
      mode: 'cors',
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        "name": "My cool new game" 
      }), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then( res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  postScore(name, score){
    const endpoint = 'games/hZNLe8ziB8YIZFe3yB6c/scores/'
    fetch(this.url + endpoint, {
      mode: 'cors',
      method: 'POST', // or 'PUT'
      body: JSON.stringify({ 
        "user": name,
        "score": score
      }), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then( res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  getScores() {
    const endpoint = 'games/hZNLe8ziB8YIZFe3yB6c/scores/'
    fetch(this.url + endpoint, {
      mode: 'cors',
      method: 'GET'
    }).then( res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

}