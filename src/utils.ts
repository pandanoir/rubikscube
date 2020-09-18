import { Direction, CubeFace } from "./type";

export const copy = <T>(arr: T[]): T[] => arr.concat();
export const reverseDirection = (dir: Direction): Direction => {
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