import { copy } from './utils';

import { Direction, CubeFace, CubeType, Face, Color } from './type';

//   B
const rev = (dir: Direction): Direction => {
  if (dir === 'R') return `R'`;
  if (dir === 'L') return `L'`;
  if (dir === 'U') return `U'`;
  if (dir === 'D') return `D'`;
  if (dir === 'F') return `F'`;
  if (dir === 'B') return `B'`;

  if (dir === `R'`) return 'R';
  if (dir === `L'`) return 'L';
  if (dir === `U'`) return 'U';
  if (dir === `D'`) return 'D';
  if (dir === `F'`) return 'F';
  if (dir === `B'`) return 'B';

  if (dir === 'M') return `M'`;
  if (dir === 'S') return `S'`;
  if (dir === 'E') return `E'`;

  if (dir === `M'`) return 'M';
  if (dir === `S'`) return 'S';
  if (dir === `E'`) return 'E';

  if (dir === 'x') return `x'`;
  if (dir === 'y') return `y'`;
  if (dir === 'z') return `z'`;

  if (dir === `x'`) return 'x';
  if (dir === `y'`) return 'y';
  if (dir === `z'`) return 'z';
  // M2とかR2
  return dir;
};

const copyFace = (face: CubeFace): CubeFace => face.concat();
const baseRotate: (transform: number[]) => (face: CubeFace) => CubeFace = (
  transform
) => (face) => transform.map((x) => face[x]);

const rotateRight: (face: CubeFace) => CubeFace = baseRotate([
  6,
  3,
  0,
  7,
  4,
  1,
  8,
  5,
  2,
]);
const rotateLeft: (face: CubeFace) => CubeFace = baseRotate([
  2,
  5,
  8,
  1,
  4,
  7,
  0,
  3,
  6,
]);
const rotateRight2: (face: CubeFace) => CubeFace = baseRotate([
  8,
  7,
  6,
  5,
  4,
  3,
  2,
  1,
  0,
]);
const rotateLeft2: (face: CubeFace) => CubeFace = rotateRight2;

const setBase = (face: CubeFace, basePoint: number): CubeFace => {
  // basePoint represent the index of face
  // for instance, if you rotate using y command, B must be same with R in index.
  if (basePoint === 0) return copyFace(face);
  if (basePoint === 2) return rotateLeft(face);
  if (basePoint === 6) return rotateRight(face);
  if (basePoint === 8) return rotateLeft2(face);
  throw new Error('invalid basePoint.');
};

export default class Cube {
  public face: CubeType;
  constructor(
    face: CubeType = {
      U: ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'], // white
      F: ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R'], // red
      R: ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'], // blue
      L: ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'], // green
      B: ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], // orange
      D: ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'], // yellow
    }
  ) {
    this.face = face;
  }
  rotate(..._direction: Direction[]): this {
    for (const dir of _direction) {
      if (dir === '') {
        continue;
      }
      this._rotate(dir);
    }
    return this;
  }
  private _rotate(direction: Direction): this {
    const isReverseRotation: boolean = direction.includes("'");
    const move = direction.replace(/['2]/g, '').replace(
      /\(([ruf])\)/,
      (_, a) =>
        ({
          r: 'x',
          u: 'y',
          f: 'z',
        }[a as 'r' | 'u' | 'f'])
    ) as Direction; // d.slice(0, -1) cannot remove prime from "(r')".
    if (direction.includes('2')) {
      this.rotate(move);
      this.rotate(move);
      return this;
    }
    if (
      move === 'L' ||
      move === 'U' ||
      move === 'D' ||
      move === 'F' ||
      move === 'B'
    ) {
      // this rotation is implemented by reorientating cube and R rotating
      const reorientation = ({
        L: '(u2)',
        U: '(f)',
        D: `(f')`,
        F: `(u')`,
        B: '(u)',
      } as const)[move];
      return this.rotate(reorientation)
        .rotate(isReverseRotation ? `R'` : 'R')
        .rotate(rev(reorientation));
    }
    if (move === 'R') {
      // R rotation
      this.moveColumn([2, 5, 8], isReverseRotation);

      if (isReverseRotation) {
        this.face.R = rotateLeft(this.face.R);
        return this;
      }
      this.face.R = rotateRight(this.face.R);
      return this;
    }
    if (move === 'M' || move === 'S' || move === 'E') {
      // const reorientation: Direction? = ({M: null, S: Direction.y, E: Direction.z} as {[P in 'M'|'S'|'E']: Reorientation})[move];
      const reorientation: Direction = ({
        M: '',
        S: 'y',
        E: 'z',
      } as const)[move];
      this.rotate(reorientation);
      this.moveColumn([1, 4, 7], !isReverseRotation);
      this.rotate(rev(reorientation));
      return this;
    }
    if (move === 'x' || move === 'y' || move === 'z') {
      const faceOrder: Face[] = ({
        x: ['U', 'F', 'D', 'B'],
        y: ['L', 'F', 'R', 'B'],
        z: ['U', 'L', 'D', 'R'],
      } as { [P in 'x' | 'y' | 'z']: Face[] })[move];
      const R: Face = ({ x: 'R', y: 'U', z: 'F' } as {
          [P in 'x' | 'y' | 'z']: Face;
        })[move],
        L: Face = ({ x: 'L', y: 'D', z: 'B' } as {
          [P in 'x' | 'y' | 'z']: Face;
        })[move];

      if (isReverseRotation) faceOrder.reverse();

      const before = copyFace(this.face[faceOrder[0]]);
      for (let i = 0; i < 3; i++)
        this.face[faceOrder[i]] = copyFace(this.face[faceOrder[i + 1]]);
      this.face[faceOrder[3]] = before;

      if (isReverseRotation) {
        this.face[R] = rotateLeft(this.face[R]);
        this.face[L] = rotateRight(this.face[L]);
      } else {
        this.face[R] = rotateRight(this.face[R]);
        this.face[L] = rotateLeft(this.face[L]);
      }

      if (move === 'y') {
        if (!isReverseRotation) {
          this.face.R = setBase(this.face.R, 8);
          this.face.B = setBase(this.face.B, 8);
        } else {
          this.face.B = setBase(this.face.B, 8);
          this.face.L = setBase(this.face.L, 8);
        }
      } else if (move === 'z') {
        for (let i = 0; i < 4; i++) {
          this.face[faceOrder[i]] = setBase(
            this.face[faceOrder[i]],
            isReverseRotation ? 2 : 6
          );
        }
      }
      return this;
    }
    throw new Error('unexpected rotation letter.');
  }
  private moveColumn(position: number[], isUpward: boolean): void {
    const faceOrder = isUpward
      ? (['B', 'D', 'F', 'U'] as const)
      : (['U', 'F', 'D', 'B'] as const);
    const firstFace = this.face[faceOrder[0]];
    const tmp: Color[] = [];
    for (const pos of position) tmp.push(firstFace[pos]);

    for (let i = 0, _i = faceOrder.length; i + 1 < _i; i++) {
      const now = this.face[faceOrder[i]],
        next = this.face[faceOrder[i + 1]];

      for (const pos of position) now[pos] = next[pos];
    }

    const lastFace = this.face[faceOrder[faceOrder.length - 1]];
    for (const pos of position) lastFace[pos] = tmp[pos];
  }
  /**
   * @description
   * Copy this cube.
   */
  copy(): Cube {
    const faces = {
      U: copy(this.face.U),
      F: copy(this.face.F),
      R: copy(this.face.R),
      L: copy(this.face.L),
      B: copy(this.face.B),
      D: copy(this.face.D),
    };

    const newCube = new Cube();
    newCube.face = faces;
    return newCube;
  }
}
