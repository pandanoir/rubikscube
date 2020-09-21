export type Color = string;
export type CubeFace = Color[];
export type Face = 'U' | 'F' | 'R' | 'L' | 'B' | 'D';
export type CubeType = {
  [key in Face]: CubeFace;
};
export type BasicReorientation = 'x' | 'y' | 'z' | '(r)' | '(u)' | '(f)';
export type BasicSquaredReorientation =
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
export type SquaredReorientation =
  | BasicSquaredReorientation
  | "x2'"
  | "y2'"
  | "z2'"
  | "(r2')"
  | "(u2')"
  | "(f2')";
type NormalizedAdvancedReorientation =
  | "x2'"
  | "y2'"
  | "z2'"
  | "(r2')"
  | "(u2')"
  | "(f2')";
type AdvancedReorientation =
  | "x2'"
  | "y2'"
  | "z2'"
  | "(r2')"
  | "(u2')"
  | "(f2')"
  | "x'2"
  | "y'2"
  | "z'2"
  | "(r'2)"
  | "(u'2)"
  | "(f'2)";

export type Reorientation =
  | BasicReorientation
  | BasicSquaredReorientation
  | ReverseReorientation
  | AdvancedReorientation;
export type NormalizedReorientation =
  | BasicReorientation
  | BasicSquaredReorientation
  | ReverseReorientation
  | NormalizedAdvancedReorientation;

export type BasicRotation = 'R' | 'L' | 'U' | 'D' | 'F' | 'B' | 'M' | 'S' | 'E';
export type BasicSquaredRotation =
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
export type WideRotation = 'Rw' | 'Lw' | 'Uw' | 'Dw' | 'Fw' | 'Bw';

export type SquaredRotation =
  | BasicSquaredRotation
  | 'Rw2'
  | 'Lw2'
  | 'Uw2'
  | 'Dw2'
  | 'Fw2'
  | 'Bw2'
  | "R2'"
  | "L2'"
  | "U2'"
  | "D2'"
  | "F2'"
  | "B2'"
  | "M2'"
  | "S2'"
  | "E2'"
  | "Rw2'"
  | "Lw2'"
  | "Uw2'"
  | "Dw2'"
  | "Fw2'"
  | "Bw2'";
type NormalizedAdvancedRotation =
  | 'Rw2'
  | 'Lw2'
  | 'Uw2'
  | 'Dw2'
  | 'Fw2'
  | 'Bw2'
  | "Rw'"
  | "Lw'"
  | "Uw'"
  | "Dw'"
  | "Fw'"
  | "Bw'"
  | "R2'"
  | "L2'"
  | "U2'"
  | "D2'"
  | "F2'"
  | "B2'"
  | "M2'"
  | "S2'"
  | "E2'"
  | "Rw2'"
  | "Lw2'"
  | "Uw2'"
  | "Dw2'"
  | "Fw2'"
  | "Bw2'";
type AdvancedRotation =
  | 'Rw2'
  | 'Lw2'
  | 'Uw2'
  | 'Dw2'
  | 'Fw2'
  | 'Bw2'
  | "Rw'"
  | "Lw'"
  | "Uw'"
  | "Dw'"
  | "Fw'"
  | "Bw'"
  | "Rw2'"
  | "Lw2'"
  | "Uw2'"
  | "Dw2'"
  | "Fw2'"
  | "Bw2'"
  | "Rw'2"
  | "Lw'2"
  | "Uw'2"
  | "Dw'2"
  | "Fw'2"
  | "Bw'2"
  | 'R2w'
  | 'L2w'
  | 'U2w'
  | 'D2w'
  | 'F2w'
  | 'B2w'
  | "R2'"
  | "L2'"
  | "U2'"
  | "D2'"
  | "F2'"
  | "B2'"
  | "M2'"
  | "S2'"
  | "E2'"
  | "R2w'"
  | "L2w'"
  | "U2w'"
  | "D2w'"
  | "F2w'"
  | "B2w'"
  | "R2'w"
  | "L2'w"
  | "U2'w"
  | "D2'w"
  | "F2'w"
  | "B2'w"
  | "R'2"
  | "L'2"
  | "U'2"
  | "D'2"
  | "F'2"
  | "B'2"
  | "M'2"
  | "S'2"
  | "E'2"
  | "R'w"
  | "L'w"
  | "U'w"
  | "D'w"
  | "F'w"
  | "B'w"
  | "R'2w"
  | "L'2w"
  | "U'2w"
  | "D'2w"
  | "F'2w"
  | "B'2w"
  | "R'w2"
  | "L'w2"
  | "U'w2"
  | "D'w2"
  | "F'w2"
  | "B'w2";
export type Rotation =
  | BasicRotation
  | BasicSquaredRotation
  | ReverseRotation
  | WideRotation
  | AdvancedRotation;
export type NormalizedRotation =
  | BasicRotation
  | BasicSquaredRotation
  | ReverseRotation
  | WideRotation
  | NormalizedAdvancedRotation;

export type Noop = '';
export type Direction = Reorientation | Rotation | Noop;
export type NormalizedDirection =
  | NormalizedReorientation
  | NormalizedRotation
  | Noop;
