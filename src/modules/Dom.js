const elements = () => {
  const phaserGame = document.querySelector('#phaser-example')
  const hidden = document.querySelector('.invisible')
  const button = document.querySelector('#btnSend')
  const username = document.querySelector('#username')
  return {
    phaserGame,
    button,
    username,
    hidden
  }
}

export default elements