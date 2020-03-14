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
    this.username = dom().phaserGame.getAttribute('name')
  }

  getUser() {
    return this.username
  }

  checkScore() {
    const data = localStorage
    this.setUser()
    this.score = data[this.getUser()] ? parseInt(data[this.getUser()]) : 100
  }

  getScore() {
    return this.score
  }
}