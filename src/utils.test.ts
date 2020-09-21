import { normalize, reverseDirection, setBase } from './utils';

describe('reverseDirection()', () => {
  it('reverses the basic rotations', () => {
    expect(reverseDirection('R')).toBe("R'");
    expect(reverseDirection('L')).toBe("L'");
    expect(reverseDirection('U')).toBe("U'");
    expect(reverseDirection('D')).toBe("D'");
    expect(reverseDirection('B')).toBe("B'");
    expect(reverseDirection('F')).toBe("F'");

    expect(reverseDirection('M')).toBe("M'");
    expect(reverseDirection('S')).toBe("S'");
    expect(reverseDirection('E')).toBe("E'");

    expect(reverseDirection('x')).toBe("x'");
    expect(reverseDirection('y')).toBe("y'");
    expect(reverseDirection('z')).toBe("z'");

    expect(reverseDirection('(r)')).toBe("(r')");
    expect(reverseDirection('(u)')).toBe("(u')");
    expect(reverseDirection('(f)')).toBe("(f')");
  });

  it('reverses the basic reverse rotations', () => {
    expect(reverseDirection("R'")).toBe('R');
    expect(reverseDirection("L'")).toBe('L');
    expect(reverseDirection("U'")).toBe('U');
    expect(reverseDirection("D'")).toBe('D');
    expect(reverseDirection("B'")).toBe('B');
    expect(reverseDirection("F'")).toBe('F');

    expect(reverseDirection("M'")).toBe('M');
    expect(reverseDirection("S'")).toBe('S');
    expect(reverseDirection("E'")).toBe('E');

    expect(reverseDirection("x'")).toBe('x');
    expect(reverseDirection("y'")).toBe('y');
    expect(reverseDirection("z'")).toBe('z');

    expect(reverseDirection("(r')")).toBe('(r)');
    expect(reverseDirection("(u')")).toBe('(u)');
    expect(reverseDirection("(f')")).toBe('(f)');
  });

  it('reverses the other complex rotations', () => {
    expect(reverseDirection('R2')).toBe('R2');
    expect(reverseDirection('L2')).toBe('L2');
    expect(reverseDirection('U2')).toBe('U2');
    expect(reverseDirection('D2')).toBe('D2');
    expect(reverseDirection('B2')).toBe('B2');
    expect(reverseDirection('F2')).toBe('F2');

    expect(reverseDirection('R2')).toBe('R2');
    expect(reverseDirection('L2')).toBe('L2');
    expect(reverseDirection('U2')).toBe('U2');
    expect(reverseDirection('D2')).toBe('D2');
    expect(reverseDirection('B2')).toBe('B2');
    expect(reverseDirection('F2')).toBe('F2');

    expect(reverseDirection('M2')).toBe('M2');
    expect(reverseDirection('S2')).toBe('S2');
    expect(reverseDirection('E2')).toBe('E2');

    expect(reverseDirection('M2')).toBe('M2');
    expect(reverseDirection('S2')).toBe('S2');
    expect(reverseDirection('E2')).toBe('E2');

    expect(reverseDirection(`Rw'`)).toBe('Rw');
    expect(reverseDirection('Rw2')).toBe('Rw2');
  });
});
describe('normalize()', () => {
  it('returns input as is if the input has already been normalized', () => {
    expect(normalize(`Rw2`)).toBe(`Rw2`);
    expect(normalize(`Uw2`)).toBe(`Uw2`);
    expect(normalize(`M2`)).toBe(`M2`);

    expect(normalize(`x2`)).toBe(`x2`);
    expect(normalize(`y2`)).toBe(`y2`);
    expect(normalize(`z2`)).toBe(`z2`);

    expect(normalize(`(r2)`)).toBe(`(r2)`);
    expect(normalize(`(u2)`)).toBe(`(u2)`);
    expect(normalize(`(f2)`)).toBe(`(f2)`);
  });
  it('normalizes complex rotations', () => {
    expect(normalize(`R2'w`)).toBe(`Rw2`);
    expect(normalize(`U2'w`)).toBe(`Uw2`);
    expect(normalize(`M'2`)).toBe(`M2`);

    expect(normalize(`x'2`)).toBe(`x2`);
    expect(normalize(`y'2`)).toBe(`y2`);
    expect(normalize(`z'2`)).toBe(`z2`);

    expect(normalize(`(r'2)`)).toBe(`(r2)`);
    expect(normalize(`(u'2)`)).toBe(`(u2)`);
    expect(normalize(`(f'2)`)).toBe(`(f2)`);
  });
});
describe('setBase()', () => {
  it('', () => {
    expect(setBase(['0', '1', '2', '3', '4', '5', '6', '7', '8'], 0)).toEqual([
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
    ]);
    expect(setBase(['0', '1', '2', '3', '4', '5', '6', '7', '8'], 2)).toEqual([
      '2',
      '5',
      '8',
      '1',
      '4',
      '7',
      '0',
      '3',
      '6',
    ]);
    expect(setBase(['0', '1', '2', '3', '4', '5', '6', '7', '8'], 6)).toEqual([
      '6',
      '3',
      '0',
      '7',
      '4',
      '1',
      '8',
      '5',
      '2',
    ]);
    expect(setBase(['0', '1', '2', '3', '4', '5', '6', '7', '8'], 8)).toEqual([
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2',
      '1',
      '0',
    ]);
  });
});
