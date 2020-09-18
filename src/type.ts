export type Color = string;
export type CubeFace = Color[];
export type Face = 'U' | 'F' | 'R' | 'L' | 'B' | 'D';
export type CubeType = {
  [key in Face]: CubeFace;
};
export type BasicReorientation = 'x' | 'y' | 'z' | '(r)' | '(u)' | '(f)';
export type SquaredReorientation =
  | 'x2'
  | 'y2'
  | 'z2'
  | '(r2)'
  | '(u2)'
  | '(f2)';
export type ReverseReorientation =
  | "x'"
  | "y'"
  | "z'"
  | "(r')"
  | "(u')"
  | "(f')";
type Reorientation = BasicReorientation | SquaredReorientation | ReverseReorientation;

export type BasicRotation = 'R' | 'L' | 'U' | 'D' | 'F' | 'B' | 'M' | 'S' | 'E';
export type SquaredRotation =
  | 'R2'
  | 'L2'
  | 'U2'
  | 'D2'
  | 'F2'
  | 'B2'
  | 'M2'
  | 'S2'
  | 'E2';
export type ReverseRotation =
  | "R'"
  | "L'"
  | "U'"
  | "D'"
  | "F'"
  | "B'"
  | "M'"
  | "S'"
  | "E'";
type Rotation =
  | BasicRotation
  | SquaredRotation
  | ReverseRotation;

export type Noop = '';
export type Direction = Reorientation | Rotation | Noop;
