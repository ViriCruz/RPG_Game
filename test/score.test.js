import Score from '../src/modules/Score';

describe('Testing Score class', () => {
  document.body.innerHTML = '<div id="phaser-example" name="user"></div>';
  const score = new Score();

  test('when checkScore(), username must have the name that user introduced.', () => {
    score.checkScore();
    expect(score.getUser()).toEqual('user');
  });

  test('when checkScore(), score initially has 100 points', () => {
    expect(score.getScore()).toEqual(100);
  });

  test('when addPoints(), it adds 100 points to score', () => {
    score.addPoints();
    expect(score.getScore()).toEqual(200);
  });

  test('when addPoints(), it mustn\'t be 100', () => {
    expect(score.getScore()).not.toBe(100);
  });
});
