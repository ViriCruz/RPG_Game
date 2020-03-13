import Menu from './Menu';

export default class EnemiesMenu extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);
    Menu.call(this, scene, x, y);
  }

  confirm() {
    this.scene.events.emit('Enemy', this.menuItemIndex);
  }
}
