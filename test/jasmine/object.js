/* global stabilize */

describe('stabilize(Object)', () => {
  let v = stabilize({
    name: 'Alice',
    age: 22
  });
  it('must return an object...', () => {
    expect(v).toEqual(jasmine.any(Object));
  });
  describe('with the following methods:', () => {
    [
      'get',
      'set'
    ].forEach((m) => {
      it(`.${m}()`, () => {
        expect(v[m]).toBeDefined();
      });
    });
  });
});
