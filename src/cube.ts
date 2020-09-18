// Cube has six faces.
// Structure which represents cube.
//            [0, 1, 2]
//            [3, 4, 5]
//            [6, 7, 8]
// [0, 1, 2]  [0, 1, 2]  [0, 1, 2]
// [3, 4, 5]  [3, 4, 5]  [3, 4, 5]
// [6, 7, 8]  [6, 7, 8]  [6, 7, 8]
//            [0, 1, 2]
//            [3, 4, 5]
//            [6, 7, 8]
//            [0, 1, 2]
//            [3, 4, 5]
//            [6, 7, 8]
//   U
// L F R
//   D

import { Direction, CubeFace, CubeType, Face, Color } from "./type";

//   B
const rev = (dir: Direction): Direction => {
  const { R, L, U, D, F, B } = Direction;
  const { R_rev, L_rev, U_rev, D_rev, F_rev, B_rev } = Direction;
  if (dir === R) return R_rev;
  if (dir === L) return L_rev;
  if (dir === U) return U_rev;
  if (dir === D) return D_rev;
  if (dir === F) return F_rev;
  if (dir === B) return B_rev;

  if (dir === R_rev) return R;
  if (dir === L_rev) return L;
  if (dir === U_rev) return U;
  if (dir === D_rev) return D;
  if (dir === F_rev) return F;
  if (dir === B_rev) return B;

  const { M, S, E } = Direction;
  const { M_rev, S_rev, E_rev } = Direction;
  if (dir === M) return M_rev;
  if (dir === S) return S_rev;
  if (dir === E) return E_rev;

  if (dir === M_rev) return M;
  if (dir === S_rev) return S;
  if (dir === E_rev) return E;
  if ([M_rev, S_rev, E_rev].includes(dir)) return dir;

  const { x, y, z } = Direction;
  const { x_rev, y_rev, z_rev } = Direction;
  if (dir === x) return x_rev;
  if (dir === y) return y_rev;
  if (dir === z) return z_rev;

  if (dir === x_rev) return x;
  if (dir === y_rev) return y;
  if (dir === z_rev) return z;
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
  rotate(direction: Direction): this {
    const doesReverseRotate: boolean = direction.includes("'");
    const move = direction.replace(/['2]/g, '').replace(
      /\(([ruf])\)/,
      (_, a) =>
        ({
          // [Direction.r]: Direction.x,
          // [Direction.u]: Direction.y,
          // [Direction.f]: Direction.z,
          r: Direction.x,
          u: Direction.y,
          f: Direction.z,
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
      const reorientation = {
        [Direction.L]: Direction.u2,
        [Direction.U]: Direction.f,
        [Direction.D]: rev(Direction.f),
        [Direction.F]: rev(Direction.u),
        [Direction.B]: Direction.u,
      }[move];
      return this.rotate(reorientation)
        .rotate(doesReverseRotate ? Direction.R_rev : Direction.R)
        .rotate(rev(reorientation));
    }
    if (move === 'R') {
      // R rotation
      const faceOrder: Face[] = ['U', 'F', 'D', 'B'];
      if (doesReverseRotate) faceOrder.reverse();

      this.swapCube([2, 5, 8], faceOrder);

      if (doesReverseRotate) {
        this.face.R = rotateLeft(this.face.R);
        return this;
      }
      this.face.R = rotateRight(this.face.R);
      return this;
    }
    if (move === 'M' || move === 'S' || move === 'E') {
      // const reorientation: Direction? = ({M: null, S: Direction.y, E: Direction.z} as {[P in 'M'|'S'|'E']: Reorientation})[move];
      const reorientation: Direction | null = {
        M: null,
        S: Direction.y,
        E: Direction.z,
      }[move];
      const faceOrder: Face[] = ['B', 'D', 'F', 'U'];
      if (doesReverseRotate) faceOrder.reverse();

      if (reorientation) this.rotate(reorientation);

      this.swapCube([1, 4, 7], faceOrder);

      if (reorientation) this.rotate(`${reorientation}'` as Direction);
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

      if (doesReverseRotate) faceOrder.reverse();

      const before = copyFace(this.face[faceOrder[0]]);
      for (let i = 0; i < 3; i++)
        this.face[faceOrder[i]] = copyFace(this.face[faceOrder[i + 1]]);
      this.face[faceOrder[3]] = before;

      if (doesReverseRotate) {
        this.face[R] = rotateLeft(this.face[R]);
        this.face[L] = rotateRight(this.face[L]);
      } else {
        this.face[R] = rotateRight(this.face[R]);
        this.face[L] = rotateLeft(this.face[L]);
      }

      if (move === 'y')
        if (!doesReverseRotate) {
          this.face.R = setBase(this.face.R, 8);
          this.face.B = setBase(this.face.B, 8);
        } else {
          this.face.B = setBase(this.face.B, 8);
          this.face.L = setBase(this.face.L, 8);
        }
      if (move === 'z')
        for (let i = 0; i < 4; i++)
          this.face[faceOrder[i]] = setBase(
            this.face[faceOrder[i]],
            !doesReverseRotate ? 6 : 2
          );
      return this;
    }
    throw new Error('unexpected rotation letter.');
  }
  swapCube(position: number[], faceOrder: Face[]) {
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
  copy() {
    const faces = {} as CubeType;
    // for (const key of (Object.keys(this.face) as Array<keyof CubeType>))
    //     faces[key] = copyFace(this.face[key]);
    for (const key of ['U', 'F', 'R', 'L', 'B', 'D'] as Face[])
      faces[key] = copyFace(this.face[key]);

    const newCube = new Cube();
    newCube.face = faces;
    return newCube;
  }
}
