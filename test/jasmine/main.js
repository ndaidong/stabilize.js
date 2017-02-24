/* global stabilize */

describe('stabilize()', () => {
  it('must be a function', () => {
    expect(stabilize).toBeDefined();
  });

  let r = stabilize();
  it('must return undefined if no param', () => {
    expect(r).toBeUndefined();
  });
});
