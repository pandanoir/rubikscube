import {
  CubeType,
  CubeFace,
  Direction,
  BasicRotation,
  NormalizedDirection,
  SquaredRotation,
  ReverseRotation,
  BasicReorientation,
  SquaredReorientation,
  ReverseReorientation,
  WideRotation,
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
export const isBasicWideRotation = (dir: Direction): dir is WideRotation => {
  if (
    dir === 'Rw' ||
    dir === 'Lw' ||
    dir === 'Uw' ||
    dir === 'Dw' ||
    dir === 'Fw' ||
    dir === 'Bw'
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
/**
 * @description
 * normalize the move notation.
 * Rotation[w][2][']
 */
export const normalize = (dir: Direction): NormalizedDirection => {
  if (dir === '') return '';
  if (isBasicRotation(dir)) return dir;
  if (isBasicSquaredRotation(dir)) return dir;
  if (isBasicReverseRotation(dir)) return dir;
  if (isBasicWideRotation(dir)) return dir;

  if (isBasicReorientation(dir)) return dir;
  if (isBasicSquaredReorientation(dir)) return dir;
  if (isBasicReverseReorientation(dir)) return dir;
  if (dir === "x'2" || dir === "y'2" || dir === "z'2")
    return `${dir[0]}2'` as NormalizedDirection;
  if (dir === "(r'2)" || dir === "(u'2)" || dir === "(f'2)")
    return `(${dir[1]}2')` as NormalizedDirection;
  if (
    dir === "x2'" ||
    dir === "y2'" ||
    dir === "z2'" ||
    dir === "(r2')" ||
    dir === "(u2')" ||
    dir === "(f2')"
  )
    return dir;

  // advanced rotations
  let res = dir[0];
  if (dir.includes('w')) res += 'w';
  if (dir.includes('2')) res += '2';
  if (dir.includes("'")) res += "'";
  return res as NormalizedDirection;
};
export const copy = <T>(arr: T[]): T[] => arr.concat();
export const reverseDirection = (
  dir: NormalizedDirection
): NormalizedDirection => {
  if (dir === '') return '';
  // basic rotations
  if (isBasicRotation(dir) || isBasicWideRotation(dir))
    return `${dir}'` as NormalizedDirection;
  if (isBasicReverseRotation(dir)) return dir.replace(/'/, '') as BasicRotation;
  if (isBasicSquaredRotation(dir)) return dir;

  if (isBasicSquaredReorientation(dir)) return dir;
  if (isBasicReverseReorientation(dir))
    return dir.replace(/'/, '') as BasicReorientation;

  if (dir === 'x') return `x'`;
  if (dir === 'y') return `y'`;
  if (dir === 'z') return `z'`;

  if (dir === '(r)') return "(r')";
  if (dir === '(u)') return "(u')";
  if (dir === '(f)') return "(f')";

  // advanced rotations
  if (dir.includes('2')) return dir;
  if (dir.includes("'")) return dir.replace(/'/, '') as NormalizedDirection;
  return `${dir}'` as NormalizedDirection;
};

export const baseRotate = (transform: number[]) => (face: CubeFace): CubeFace =>
  transform.map((x) => face[x]);

const rotateRight = baseRotate([6, 3, 0, 7, 4, 1, 8, 5, 2]);
const rotateLeft = baseRotate([2, 5, 8, 1, 4, 7, 0, 3, 6]);
const rotateRight2 = baseRotate([8, 7, 6, 5, 4, 3, 2, 1, 0]);
const rotateLeft2 = rotateRight2;

/**
 * @param basePoint: the position pointed to by this becomes the upper left position
 */
export const setBase = (face: CubeFace, basePoint: 0 | 2 | 6 | 8): CubeFace => {
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
