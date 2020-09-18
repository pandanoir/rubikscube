import { reverseDirection } from './utils';

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

    expect(reverseDirection("R2'")).toBe("R2'");
    expect(reverseDirection("L2'")).toBe("L2'");
    expect(reverseDirection("U2'")).toBe("U2'");
    expect(reverseDirection("D2'")).toBe("D2'");
    expect(reverseDirection("B2'")).toBe("B2'");
    expect(reverseDirection("F2'")).toBe("F2'");

    expect(reverseDirection('M2')).toBe('M2');
    expect(reverseDirection('S2')).toBe('S2');
    expect(reverseDirection('E2')).toBe('E2');

    expect(reverseDirection("M2'")).toBe("M2'");
    expect(reverseDirection("S2'")).toBe("S2'");
    expect(reverseDirection("E2'")).toBe("E2'");
  });
});
