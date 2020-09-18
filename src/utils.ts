import { Direction } from "./type";

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