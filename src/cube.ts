import {
  BasicRotation,
  CubeType,
  Direction,
  Face,
  NormalizedDirection,
  WideRotation,
} from './type';
import {
  baseRotate,
  copy,
  isBasicWideRotation,
  moveColumn,
  normalize,
  reverseDirection,
  setBase,
} from './utils';

export {
  CubeType,
  CubeFace,
  Direction,
  Noop,
  Rotation,
  Reorientation,
} from './type';

const rotateRight = baseRotate([6, 3, 0, 7, 4, 1, 8, 5, 2]);
const rotateLeft = baseRotate([2, 5, 8, 1, 4, 7, 0, 3, 6]);

/**
 * @description
 * Cube has six faces.
 * Structure which represents cube.
 *            [0, 1, 2]
 *            [3, 4, 5]
 *            [6, 7, 8]
 * [0, 1, 2]  [0, 1, 2]  [0, 1, 2]
 * [3, 4, 5]  [3, 4, 5]  [3, 4, 5]
 * [6, 7, 8]  [6, 7, 8]  [6, 7, 8]
 *            [0, 1, 2]
 *            [3, 4, 5]
 *            [6, 7, 8]
 *            [0, 1, 2]
 *            [3, 4, 5]
 *            [6, 7, 8]
 *   U
 * L F R
 *   D
 *   B
 */
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
      const normalized = normalize(dir);
      if (normalized === '') {
        continue;
      }
      this._rotate(normalized);
    }
    return this;
  }
  private _rotate(direction: NormalizedDirection): this {
    const isReverseRotation = direction.includes("'");
    const move = direction
      .replace(/['2]/g, '')
      .replace(
        /\(([ruf])\)/,
        (_, a: 'r' | 'u' | 'f') => ({ r: 'x', u: 'y', f: 'z' }[a])
      ) as BasicRotation | 'x' | 'y' | 'z' | WideRotation;
    if (direction.includes('2')) {
      this.rotate(move);
      this.rotate(move);
      return this;
    }
    if (move === 'R') {
      // R rotation
      this.face = moveColumn(this.face, [2, 5, 8], isReverseRotation);
      this.face.R = isReverseRotation
        ? rotateLeft(this.face.R)
        : rotateRight(this.face.R);
      return this;
    }
    if (
      move === 'L' ||
      move === 'U' ||
      move === 'D' ||
      move === 'F' ||
      move === 'B'
    ) {
      // These rotations other than R is implemented by a combining cube reorientation and R rotation.
      const reorientation = ({
        L: '(u2)',
        U: '(f)',
        D: `(f')`,
        F: `(u')`,
        B: '(u)',
      } as const)[move];
      return this.rotate(reorientation)
        .rotate(isReverseRotation ? `R'` : 'R')
        .rotate(reverseDirection(reorientation));
    }
    if (move === 'M' || move === 'S' || move === 'E') {
      // S and E are implemented by M rotation and cube reorientation.
      const reorientation = ({
        M: '',
        S: 'y',
        E: 'z',
      } as const)[move];
      this.rotate(reorientation);
      this.face = moveColumn(this.face, [1, 4, 7], !isReverseRotation);
      this.rotate(reverseDirection(reorientation));
      return this;
    }
    if (move === 'x' || move === 'y' || move === 'z') {
      const faceOrder: Face[] = {
        x: ['U', 'F', 'D', 'B'] as Face[],
        y: ['L', 'F', 'R', 'B'] as Face[],
        z: ['U', 'L', 'D', 'R'] as Face[],
      }[move];
      if (isReverseRotation) {
        faceOrder.reverse();
      }
      const R = ({ x: 'R', y: 'U', z: 'F' } as const)[move],
        L = ({ x: 'L', y: 'D', z: 'B' } as const)[move];

      const firstFace = copy(this.face[faceOrder[0]]);
      for (let i = 0; i < 3; i++) {
        this.face[faceOrder[i]] = copy(this.face[faceOrder[i + 1]]);
      }
      this.face[faceOrder[3]] = firstFace;

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
    if (isBasicWideRotation(move)) {
      let rotations: NormalizedDirection[] = [];
      if (move === 'Rw') {
        rotations = ['L', '(r)'];
      } else if (move === 'Lw') {
        rotations = ['R', "(r')"];
      } else if (move === 'Uw') {
        rotations = ['D', '(u)'];
      } else if (move === 'Dw') {
        rotations = ['U', "(u')"];
      } else if (move === 'Fw') {
        rotations = ['B', '(f)'];
      } else if (move === 'Bw') {
        rotations = ['F', "(f')"];
      }
      if (isReverseRotation) {
        rotations = rotations.map((rot) => reverseDirection(rot));
      }
      this.rotate(...rotations);

      return this;
    }
    return this;
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
