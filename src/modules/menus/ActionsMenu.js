import Menu from './Menu';

export default class ActionsMenu extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);
    Menu.call(this, scene, x, y);
    this.addMenuItem('Attack');
  }

  confirm() {
    this.scene.events.emit('SelectedAction');
  }
}
