export type Color = string;
export type CubeFace = Color[];
export type Face = 'U' | 'F' | 'R' | 'L' | 'B' | 'D';
export type CubeType = {
  [key in Face]: CubeFace;
};
// type Face = 'U' | 'F' | 'R' | 'L' | 'B' | 'D';
export type Face = keyof CubeType;
type Reorientation =
  | 'x'
  | 'y'
  | 'z'
  | 'x2'
  | 'y2'
  | 'z2'
  | "x'"
  | "y'"
  | "z'"
  | '(r)'
  | '(u)'
  | '(f)'
  | '(r2)'
  | '(u2)'
  | '(f2)'
  | "(r')"
  | "(u')"
  | "(f')";
type Rotation =
  | 'R'
  | 'L'
  | 'U'
  | 'D'
  | 'F'
  | 'B'
  | "R'"
  | "L'"
  | "U'"
  | "D'"
  | "F'"
  | "B'"
  | 'R2'
  | 'L2'
  | 'U2'
  | 'D2'
  | 'F2'
  | 'B2'
  | 'M'
  | 'S'
  | 'E'
  | 'M2'
  | 'S2'
  | 'E2'
  | "M'"
  | "S'"
  | "E'";
export enum Direction {
  R = 'R',
  L = 'L',
  U = 'U',
  D = 'D',
  F = 'F',
  B = 'B',
  R_rev = "R'",
  L_rev = "L'",
  U_rev = "U'",
  D_rev = "D'",
  F_rev = "F'",
  B_rev = "B'",
  R2 = 'R2',
  L2 = 'L2',
  U2 = 'U2',
  D2 = 'D2',
  F2 = 'F2',
  B2 = 'B2',

  M = 'M',
  S = 'S',
  E = 'E',
  M_rev = "M'",
  S_rev = "S'",
  E_rev = "E'",
  M2 = 'M2',
  S2 = 'S2',
  E2 = 'E2',

  x = 'x',
  y = 'y',
  z = 'z',
  x_rev = "x'",
  y_rev = "y'",
  z_rev = "z'",
  x2 = 'x2',
  y2 = 'y2',
  z2 = 'z2',

  r = '(r)',
  u = '(u)',
  f = '(f)',
  r_rev = "(r')",
  u_rev = "(u')",
  f_rev = "(f')",
  r2 = '(r2)',
  u2 = '(u2)',
  f2 = '(f2)',
}