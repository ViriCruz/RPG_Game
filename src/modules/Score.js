export default class Score {
  constructor() {
    this.score = 0
  }

  addPoints() {
    this.score += 100
    localStorage.setItem('score', this.score)
  }

  checkScore() {
    const data = localStorage
    this.score = data['score'] ? parseInt(data['score']) : 0
  }

  getScore() {
    return this.score
  }
}