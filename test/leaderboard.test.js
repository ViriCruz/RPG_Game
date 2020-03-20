import Leaderboard from '../src/modules/Leaderboard';

jest.mock('../src/modules/Leaderboard');

describe('Testing leaderboard api responses', () => {
  const leaderboard = new Leaderboard();

  it('returns an array of scores', async () => {
    leaderboard.loadScores.mockResolvedValue({
      result: [
        {
          user: 'John Doe',
          score: 42,
        },
        {
          user: 'Peter Parker',
          score: 35,
        },
        {
          user: 'Wonder Woman',
          score: 50,
        },
      ],
    });
    const scores = await leaderboard.loadScores();
    expect(scores).toEqual({
      result: [
        {
          user: 'John Doe',
          score: 42,
        },
        {
          user: 'Peter Parker',
          score: 35,
        },
        {
          user: 'Wonder Woman',
          score: 50,
        },
      ],
    });
  });

  it('happy path when posting new score', async () => {
    leaderboard.postScore.mockResolvedValue({
      result: 'Leaderboard score created correctly.',
    });

    const score = {
      user: 'user0003',
      score: 20,
    };

    const response = await leaderboard.postScore(score);
    expect(response).toEqual({ result: 'Leaderboard score created correctly.' });
  });

  it('unhappy path when posting new score', async () => {
    leaderboard.postScore.mockResolvedValue({
      message: 'You need to provide a valid score for the leaderboard',
    });

    const score = {
      user: 'John Doe',
      score: 0,
    };

    const response = await leaderboard.postScore(score);
    expect(response).toEqual({ message: 'You need to provide a valid score for the leaderboard' });
  });
});