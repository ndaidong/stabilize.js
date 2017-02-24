/* global stabilize */

describe('stabilize(Object)', () => {
  let v = stabilize([
    {
      name: 'Alice',
      age: 15
    },
    {
      name: 'Tom',
      age: 25
    },
    {
      name: 'Bob',
      age: 19
    },
    {
      name: 'Rick',
      age: 27
    }
  ]);
  it('must return an array...', () => {
    expect(v).toEqual(jasmine.any(Array));
  });
  describe('with the following methods:', () => {
    [
      'min',
      'max',
      'unique',
      'first',
      'last',
      'pick',
      'insert',
      'append',
      'remove',
      'isort',
      'msort',
      'ireverse',
      'shuffle'
    ].forEach((m) => {
      it(`.${m}()`, () => {
        expect(v[m]).toBeDefined();
      });
    });
  });
});
