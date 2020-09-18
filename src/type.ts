export type Color = string;
export type CubeFace = Color[];
export type Face = 'U' | 'F' | 'R' | 'L' | 'B' | 'D';
export type CubeType = {
  [key in Face]: CubeFace;
};
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
export type Direction = Reorientation | Rotation;

