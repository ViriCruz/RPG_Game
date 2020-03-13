import Unit from './Unit';

export default class Enemy extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene);
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
  }
}
