import {
  Direction,
  CubeFace,
  BasicRotation,
  SquaredRotation,
  ReverseRotation,
  BasicReorientation,
  SquaredReorientation,
  ReverseReorientation,
} from './type';

const isBasicRotation = (dir: Direction): dir is BasicRotation => {
  if (
    dir === 'R' ||
    dir === 'L' ||
    dir === 'U' ||
    dir === 'D' ||
    dir === 'F' ||
    dir === 'B' ||
    dir === 'M' ||
    dir === 'S' ||
    dir === 'E'
  )
    return true;
  return false;
};
const isBasicSquaredRotation = (dir: Direction): dir is SquaredRotation => {
  if (
    dir === 'R2' ||
    dir === 'L2' ||
    dir === 'U2' ||
    dir === 'D2' ||
    dir === 'F2' ||
    dir === 'B2' ||
    dir === 'M2' ||
    dir === 'S2' ||
    dir === 'E2'
  )
    return true;
  return false;
};
const isBasicReverseRotation = (dir: Direction): dir is ReverseRotation => {
  if (
    dir === "R'" ||
    dir === "L'" ||
    dir === "U'" ||
    dir === "D'" ||
    dir === "F'" ||
    dir === "B'" ||
    dir === "M'" ||
    dir === "S'" ||
    dir === "E'"
  )
    return true;
  return false;
};
const isBasicReorientation = (dir: Direction): dir is BasicReorientation => {
  if (
    dir === 'x' ||
    dir === 'y' ||
    dir === 'z' ||
    dir === '(r)' ||
    dir === '(u)' ||
    dir === '(f)'
  )
    return true;
  return false;
};
const isBasicSquaredReorientation = (
  dir: Direction
): dir is SquaredReorientation => {
  if (
    dir === 'x2' ||
    dir === 'y2' ||
    dir === 'z2' ||
    dir === '(r2)' ||
    dir === '(u2)' ||
    dir === '(f2)'
  )
    return true;
  return false;
};
const isBasicReverseReorientation = (
  dir: Direction
): dir is ReverseReorientation => {
  if (
    dir === "x'" ||
    dir === "y'" ||
    dir === "z'" ||
    dir === "(r')" ||
    dir === "(u')" ||
    dir === "(f')"
  )
    return true;
  return false;
};

export const copy = <T>(arr: T[]): T[] => arr.concat();
export const reverseDirection = (dir: Direction): Direction => {
  if (dir === '') return '';
  // basic rotations
  if (isBasicRotation(dir) || isBasicWideRotation(dir))
    return `${dir}'` as Direction;
  if (isBasicReverseRotation(dir)) return dir.replace(/'/, '') as Direction;
  if (isBasicSquaredRotation(dir)) return dir;

  if (isBasicSquaredReorientation(dir)) return dir;
  if (isBasicReverseReorientation(dir))
    return dir.replace(/'/, '') as Direction;

  if (dir === 'x') return `x'`;
  if (dir === 'y') return `y'`;
  if (dir === 'z') return `z'`;

  // advanced rotations
  if (dir.includes('2')) return dir;
  if (dir.includes("'")) return dir.replace(/'/, '') as Direction;
  return `${dir}'` as Direction;
};

export const baseRotate = (transform: number[]) => (face: CubeFace) =>
  transform.map((x) => face[x]);

const rotateRight = baseRotate([6, 3, 0, 7, 4, 1, 8, 5, 2]);
const rotateLeft = baseRotate([2, 5, 8, 1, 4, 7, 0, 3, 6]);
const rotateRight2 = baseRotate([8, 7, 6, 5, 4, 3, 2, 1, 0]);
const rotateLeft2 = rotateRight2;

export const setBase = (face: CubeFace, basePoint: number): CubeFace => {
  // basePoint represent the index of face
  // for instance, if you rotate using y command, B must be same with R in index.
  if (basePoint === 0) return copy(face);
  if (basePoint === 2) return rotateLeft(face);
  if (basePoint === 6) return rotateRight(face);
  if (basePoint === 8) return rotateLeft2(face);
  throw new Error('invalid basePoint.');
};
/**
 * @description
 * Move the face column to the next face.
 */
const keys = <T>(obj: T) => Object.keys(obj) as (keyof T)[];

export const moveColumn = (
  face: CubeType,
  position: number[],
  isUpward: boolean
): CubeType => {
  const newFace = Object.assign({}, face);
  for (const key of keys(newFace)) {
    newFace[key] = newFace[key].concat();
  }
  const faceOrder = isUpward
    ? (['B', 'D', 'F', 'U'] as const)
    : (['U', 'F', 'D', 'B'] as const);
  for (let i = 0; i < faceOrder.length; i++) {
    for (const pos of position) {
      newFace[faceOrder[i]][pos] =
        face[faceOrder[(i + 1) % faceOrder.length]][pos];
    }
  }
  return newFace;
};
