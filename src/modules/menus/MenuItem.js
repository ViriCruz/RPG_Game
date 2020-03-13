/* global Phaser
no-undef: off */
export default class MenuItem extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene);
    Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15 });
  }

  select() {
    // turn text yellow
    this.setColor('#f8ff38');
  }

  deselect() {
    // turn text white
    this.setColor('#ffffff');
  }

  // when the associated enemy or player unit is killed
  unitKilled() {
    this.active = false;
    this.visible = false;
  }
}
