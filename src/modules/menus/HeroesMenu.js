import Menu from './Menu';

export default class HeroesMenu extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);
    Menu.call(this, scene, x, y);
  }
}
