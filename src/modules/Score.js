import dom from './Dom'
export default class Score {
  constructor() {
    this.score = 0
    this.username
  }

  addPoints() {
    this.score += 100
    localStorage.setItem(this.username, this.score)
  }

  setUser() {
    this.username = dom().phaserGame.name
  }

  getUser() {
    return this.username
  }

  checkScore() {
    const data = localStorage
    this.score = data[this.username] ? parseInt(data[this.username]) : 0
  }

  getScore() {
    return this.score
  }
}