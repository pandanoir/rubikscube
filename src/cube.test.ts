import Cube from './cube';

describe('Cube', () => {
  describe('#rotate()', () => {
    let cube: Cube;
    beforeEach(() => {
      cube = new Cube({
        U: '0,1,2,3,4,5,6,7,8'.split(','),
        L: '9,10,11,12,13,14,15,16,17'.split(','),
        F: '18,19,20,21,22,23,24,25,26'.split(','),
        R: '27,28,29,30,31,32,33,34,35'.split(','),
        D: '36,37,38,39,40,41,42,43,44'.split(','),
        B: '45,46,47,48,49,50,51,52,53'.split(','),
      });
    });
    it('R', () => {
      cube.rotate('R');
      expect(cube.face).toEqual({
        U: '0,1,20,3,4,23,6,7,26'.split(','),
        L: '9,10,11,12,13,14,15,16,17'.split(','),
        F: '18,19,38,21,22,41,24,25,44'.split(','),
        R: '33,30,27,34,31,28,35,32,29'.split(','),
        D: '36,37,47,39,40,50,42,43,53'.split(','),
        B: '45,46,2,48,49,5,51,52,8'.split(','),
      });
    });
    it(`R'`, () => {
      cube.rotate(`R'`);
      expect(cube.face).toEqual({
        U: '0,1,47,3,4,50,6,7,53'.split(','),
        L: '9,10,11,12,13,14,15,16,17'.split(','),
        F: '18,19,2,21,22,5,24,25,8'.split(','),
        R: '29,32,35,28,31,34,27,30,33'.split(','),
        D: '36,37,20,39,40,23,42,43,26'.split(','),
        B: '45,46,38,48,49,41,51,52,44'.split(','),
      });
    });
    it('L', () => {
      cube.rotate('L');
      expect(cube.face).toEqual({
        U: '45,1,2,48,4,5,51,7,8'.split(','),
        L: '15,12,9,16,13,10,17,14,11'.split(','),
        F: '0,19,20,3,22,23,6,25,26'.split(','),
        R: '27,28,29,30,31,32,33,34,35'.split(','),
        D: '18,37,38,21,40,41,24,43,44'.split(','),
        B: '36,46,47,39,49,50,42,52,53'.split(','),
      });
    });
    it(`L'`, () => {
      cube.rotate(`L'`);
      expect(cube.face).toEqual({
        U: '18,1,2,21,4,5,24,7,8'.split(','),
        L: '11,14,17,10,13,16,9,12,15'.split(','),
        F: '36,19,20,39,22,23,42,25,26'.split(','),
        R: '27,28,29,30,31,32,33,34,35'.split(','),
        D: '45,37,38,48,40,41,51,43,44'.split(','),
        B: '0,46,47,3,49,50,6,52,53'.split(','),
      });
    });
    it('F', () => {
      cube.rotate('F');
      expect(cube.face).toEqual({
        U: '0,1,2,3,4,5,17,14,11'.split(','),
        L: '9,10,36,12,13,37,15,16,38'.split(','),
        F: '24,21,18,25,22,19,26,23,20'.split(','),
        R: '6,28,29,7,31,32,8,34,35'.split(','),
        D: '33,30,27,39,40,41,42,43,44'.split(','),
        B: '45,46,47,48,49,50,51,52,53'.split(','),
      });
    });
    it(`F'`, () => {
      cube.rotate(`F'`);
      expect(cube.face).toEqual({
        U: '0,1,2,3,4,5,27,30,33'.split(','),
        L: '9,10,8,12,13,7,15,16,6'.split(','),
        F: '20,23,26,19,22,25,18,21,24'.split(','),
        R: '38,28,29,37,31,32,36,34,35'.split(','),
        D: '11,14,17,39,40,41,42,43,44'.split(','),
        B: '45,46,47,48,49,50,51,52,53'.split(','),
      });
    });
    it('B', () => {
      cube.rotate('B');
      expect(cube.face).toEqual({
        U: '29,32,35,3,4,5,6,7,8'.split(','),
        L: '2,10,11,1,13,14,0,16,17'.split(','),
        F: '18,19,20,21,22,23,24,25,26'.split(','),
        R: '27,28,44,30,31,43,33,34,42'.split(','),
        D: '36,37,38,39,40,41,9,12,15'.split(','),
        B: '51,48,45,52,49,46,53,50,47'.split(','),
      });
    });
    it(`B'`, () => {
      cube.rotate(`B'`);
      expect(cube.face).toEqual({
        U: '15,12,9,3,4,5,6,7,8'.split(','),
        L: '42,10,11,43,13,14,44,16,17'.split(','),
        F: '18,19,20,21,22,23,24,25,26'.split(','),
        R: '27,28,0,30,31,1,33,34,2'.split(','),
        D: '36,37,38,39,40,41,35,32,29'.split(','),
        B: '47,50,53,46,49,52,45,48,51'.split(','),
      });
    });
    it('U', () => {
      cube.rotate('U');
      expect(cube.face).toEqual({
        U: '6,3,0,7,4,1,8,5,2'.split(','),
        L: '18,19,20,12,13,14,15,16,17'.split(','),
        F: '27,28,29,21,22,23,24,25,26'.split(','),
        R: '53,52,51,30,31,32,33,34,35'.split(','),
        D: '36,37,38,39,40,41,42,43,44'.split(','),
        B: '45,46,47,48,49,50,11,10,9'.split(','),
      });
    });
    it(`U'`, () => {
      cube.rotate(`U'`);
      expect(cube.face).toEqual({
        U: '2,5,8,1,4,7,0,3,6'.split(','),
        L: '53,52,51,12,13,14,15,16,17'.split(','),
        F: '9,10,11,21,22,23,24,25,26'.split(','),
        R: '18,19,20,30,31,32,33,34,35'.split(','),
        D: '36,37,38,39,40,41,42,43,44'.split(','),
        B: '45,46,47,48,49,50,29,28,27'.split(','),
      });
    });
    it('D', () => {
      cube.rotate('D');
      expect(cube.face).toEqual({
        U: '0,1,2,3,4,5,6,7,8'.split(','),
        L: '9,10,11,12,13,14,47,46,45'.split(','),
        F: '18,19,20,21,22,23,15,16,17'.split(','),
        R: '27,28,29,30,31,32,24,25,26'.split(','),
        D: '42,39,36,43,40,37,44,41,38'.split(','),
        B: '35,34,33,48,49,50,51,52,53'.split(','),
      });
    });
    it(`D'`, () => {
      cube.rotate(`D'`);
      expect(cube.face).toEqual({
        U: '0,1,2,3,4,5,6,7,8'.split(','),
        L: '9,10,11,12,13,14,24,25,26'.split(','),
        F: '18,19,20,21,22,23,33,34,35'.split(','),
        R: '27,28,29,30,31,32,47,46,45'.split(','),
        D: '38,41,44,37,40,43,36,39,42'.split(','),
        B: '17,16,15,48,49,50,51,52,53'.split(','),
      });
    });
    it('M', () => {
      cube.rotate('M');
      expect(cube.face).toEqual({
        U: '0,46,2,3,49,5,6,52,8'.split(','),
        L: '9,10,11,12,13,14,15,16,17'.split(','),
        F: '18,1,20,21,4,23,24,7,26'.split(','),
        R: '27,28,29,30,31,32,33,34,35'.split(','),
        D: '36,19,38,39,22,41,42,25,44'.split(','),
        B: '45,37,47,48,40,50,51,43,53'.split(','),
      });
    });
    it(`M'`, () => {
      cube.rotate(`M'`);
      expect(cube.face).toEqual({
        U: '0,19,2,3,22,5,6,25,8'.split(','),
        L: '9,10,11,12,13,14,15,16,17'.split(','),
        F: '18,37,20,21,40,23,24,43,26'.split(','),
        R: '27,28,29,30,31,32,33,34,35'.split(','),
        D: '36,46,38,39,49,41,42,52,44'.split(','),
        B: '45,1,47,48,4,50,51,7,53'.split(','),
      });
    });
    it('S', () => {
      cube.rotate('S');
      expect(cube.face).toEqual({
        U: '0,1,2,16,13,10,6,7,8'.split(','),
        L: '9,39,11,12,40,14,15,41,17'.split(','),
        F: '18,19,20,21,22,23,24,25,26'.split(','),
        R: '27,3,29,30,4,32,33,5,35'.split(','),
        D: '36,37,38,34,31,28,42,43,44'.split(','),
        B: '45,46,47,48,49,50,51,52,53'.split(','),
      });
    });
    it(`S'`, () => {
      cube.rotate(`S'`);
      expect(cube.face).toEqual({
        U: '0,1,2,28,31,34,6,7,8'.split(','),
        L: '9,5,11,12,4,14,15,3,17'.split(','),
        F: '18,19,20,21,22,23,24,25,26'.split(','),
        R: '27,41,29,30,40,32,33,39,35'.split(','),
        D: '36,37,38,10,13,16,42,43,44'.split(','),
        B: '45,46,47,48,49,50,51,52,53'.split(','),
      });
    });
    it('E', () => {
      cube.rotate('E');
      expect(cube.face).toEqual({
        U: '0,1,2,3,4,5,6,7,8'.split(','),
        L: '9,10,11,50,49,48,15,16,17'.split(','),
        F: '18,19,20,12,13,14,24,25,26'.split(','),
        R: '27,28,29,21,22,23,33,34,35'.split(','),
        D: '36,37,38,39,40,41,42,43,44'.split(','),
        B: '45,46,47,32,31,30,51,52,53'.split(','),
      });
    });
    it(`E'`, () => {
      cube.rotate(`E'`);
      expect(cube.face).toEqual({
        U: '0,1,2,3,4,5,6,7,8'.split(','),
        L: '9,10,11,21,22,23,15,16,17'.split(','),
        F: '18,19,20,30,31,32,24,25,26'.split(','),
        R: '27,28,29,50,49,48,33,34,35'.split(','),
        D: '36,37,38,39,40,41,42,43,44'.split(','),
        B: '45,46,47,14,13,12,51,52,53'.split(','),
      });
    });
    it('No operation', () => {
      const cube2 = cube.copy();
      cube.rotate('');
      expect(cube.face).toEqual(cube2.face);
    });
    it('Rw', () => {
      const cube2 = cube.copy();
      cube.rotate('Rw');
      cube2.rotate('L').rotate(`(r)`);
      expect(cube.face).toEqual(cube2.face);
    });
    it(`Rw'`, () => {
      const cube2 = cube.copy();
      cube.rotate(`Rw'`);
      cube2.rotate(`L'`).rotate(`(r')`);
      expect(cube.face).toEqual(cube2.face);
    });
    it('Lw', () => {
      const cube2 = cube.copy();
      cube.rotate('Lw');
      cube2.rotate('R').rotate(`(r')`);
      expect(cube.face).toEqual(cube2.face);
    });
    it(`Lw'`, () => {
      const cube2 = cube.copy();
      cube.rotate(`Lw'`);
      cube2.rotate(`R'`).rotate('(r)');
      expect(cube.face).toEqual(cube2.face);
    });

    it('Fw', () => {
      const cube2 = cube.copy();
      cube.rotate('Fw');
      cube2.rotate('B').rotate('(f)');
      expect(cube.face).toEqual(cube2.face);
    });
    it(`Fw'`, () => {
      const cube2 = cube.copy();
      cube.rotate(`Fw'`);
      cube2.rotate(`B'`).rotate(`(f')`);
      expect(cube.face).toEqual(cube2.face);
    });
    it('Bw', () => {
      const cube2 = cube.copy();
      cube.rotate('Bw');
      cube2.rotate('F').rotate(`(f')`);
      expect(cube.face).toEqual(cube2.face);
    });
    it(`Bw'`, () => {
      const cube2 = cube.copy();
      cube.rotate(`Bw'`);
      cube2.rotate(`F'`).rotate('(f)');
      expect(cube.face).toEqual(cube2.face);
    });
    it('Uw', () => {
      const cube2 = cube.copy();
      cube.rotate('Uw');
      cube2.rotate('D').rotate('(u)');
      expect(cube.face).toEqual(cube2.face);
    });
    it(`Uw'`, () => {
      const cube2 = cube.copy();
      cube.rotate(`Uw'`);
      cube2.rotate(`D'`).rotate(`(u')`);
      expect(cube.face).toEqual(cube2.face);
    });
    it('Dw', () => {
      const cube2 = cube.copy();
      cube.rotate('Dw');
      cube2.rotate('U').rotate(`(u')`);
      expect(cube.face).toEqual(cube2.face);
    });
    it(`Dw'`, () => {
      const cube2 = cube.copy();
      cube.rotate(`Dw'`);
      cube2.rotate(`U'`).rotate('(u)');
      expect(cube.face).toEqual(cube2.face);
    });
    it('R2', () => {
      const cube2 = cube.copy();
      cube.rotate('R2');
      cube2.rotate('R', 'R');
      expect(cube.face).toEqual(cube2.face);
    });
  });
});
