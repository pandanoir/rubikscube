declare type Color = 'W' | 'R' | 'Y' | 'G' | 'O' | 'B';
declare type CubeFace = Color[];
declare type CubeType = {
    U: CubeFace;
    F: CubeFace;
    R: CubeFace;
    L: CubeFace;
    B: CubeFace;
    D: CubeFace;
};
declare type Face = keyof CubeType;
declare type Reorientation = 'x' | 'y' | 'z' | 'x2' | 'y2' | 'z2' | "x'" | "y'" | "z'" | '(r)' | '(u)' | '(f)' | '(r2)' | '(u2)' | '(f2)' | "(r')" | "(u')" | "(f')";
declare type Rotation = 'R' | 'L' | 'U' | 'D' | 'F' | 'B' | "R'" | "L'" | "U'" | "D'" | "F'" | "B'" | 'R2' | 'L2' | 'U2' | 'D2' | 'F2' | 'B2' | 'M' | 'S' | 'E' | 'M2' | 'S2' | 'E2' | "M'" | "S'" | "E'";
declare type Direction = Rotation | Reorientation;
export default class Cube {
    face: CubeType;
    constructor(face?: CubeType);
    rotate(direction: Direction): this;
    swapCube(position: number[], faceOrder: Face[]): void;
    copy(): Cube;
}
export {};
