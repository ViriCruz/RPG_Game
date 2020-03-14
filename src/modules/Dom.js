const elements = () => {
  const phaserGame = document.querySelector('#phaser-example')
  const hidden = document.querySelector('.invisible')
  const button = document.querySelector('#btn-send')
  const username = document.querySelector('#username')
  const userInput = document.querySelector('#user-input')
  return {
    phaserGame,
    button,
    username,
    hidden,
    userInput
  }
}

export default elements