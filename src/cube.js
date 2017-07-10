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
//   B
'use strict';
const copy = arr => arr.concat();
const baseRotate = trans => {
    return face => {
        const beforeFace = copy(face);
        const result = copy(face);
        for (let i = 0, _i = trans.length; i < _i; i++) result[i] = trans[i];
        return result;
    }
};
const rotateRight = baseRotate([6, 3, 0, 7, 1, 8, 5, 2]);
const rotateLeft = baseRotate([2, 5, 8, 1, 7, 0, 3, 6]);
const rotateRight2 = baseRotate([8, 7, 6, 5, 3, 2, 1, 0]);
const rotateLeft2 = rotateRight2;
const setBase = (face, basePoint) => {
    // basePoint represent the index of face
    // for instance, if you rotate using y command, B must be same with R in index.
    if (basePoint === 0) return copy(face);
    else if (basePoint === 2) return rotateLeft(face);
    else if (basePoint === 6) return rotateRight(face);
    else if (basePoint === 8) return rotateLeft2(face);
    else throw new Error('invalid basePoint.');
};

class Cube {
    constructor() {
        this.face = {
        };
        this.face.U = ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']; // white
        this.face.F = ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R']; // red
        this.face.R = ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']; // yellow
        this.face.L = ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']; // green
        this.face.B = ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']; // orange
        this.face.D = ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']; // blue
    }
    rotate(d) {
        const hasPrime = d.includes("'");
        const move = (hasPrime ? d.replace("'", '') : d)
            .replace(/\(([ruf])(2?)\)/, (_,a,two) => (a === 'r' ? 'x' : a === 'u' ? 'y' : 'z')+two); // d.slice(0, -1) cannot remove prime from "(r')".
        if (move === 'R') {
            const dir = ['U', 'F', 'D', 'B'];
            if (hasPrime) dir.reverse();

            const tmp = [this.face[dir[0]][2], this.face[dir[0]][5], this.face[dir[0]][8]];
            for (let i = 0; i < 3; i++) {
                const now = dir[i], next = dir[i + 1];
                this.face[now][2] = this.face[next][2];
                this.face[now][5] = this.face[next][5];
                this.face[now][8] = this.face[next][8];
            }

            this.face[dir[3]][2] = tmp[0];
            this.face[dir[3]][5] = tmp[1];
            this.face[dir[3]][8] = tmp[2];

            this.face.R = (!hasPrime ? rotateRight : rotateLeft)(this.face.R);
        }
        if ('LUDFB'.includes(move)) {
            const preMove = {
                'L': ['(u2)', '(u2)'],
                'U': ['(f)', "(f')"],
                'D': ["(f')", '(f)'],
                'F': ["(u')", '(u)'],
                'B': ['(u)', "(u')"]
            };
            this.rotate(preMove[move][0]).rotate(!hasPrime ? 'R' : "R'").rotate(preMove[move][1]);
        }
        const isCubeRotation = 'xyz(r)(u)(f)'.contains(move);
        if (isCubeRotation) {
            const dir = [...{x: 'UFDB', y: 'LFRB', z: 'ULDR'}[move]];
            const R = {x: 'R', y: 'U', z: 'F'}[move], L = {x: 'L', y: 'D', z: 'B'}
            if (hasPrime) dir.reverse();

            const before = copy(this.face[dir[0]]);
            for (let i = 0; i < 3; i++) this.face[dir[i]] = copy(this.face[dir[i + 1]]);
            this.face[dir[3]] = before;

            this.face[R] = (!hasPrime ? rotateRight : rotateLeft)(this.face[R]);
            this.face[L] = (!hasPrime ? rotateLett : rotateLeft)(this.face[L]]);
        }
        if (move === 'y') {
            if (!hasPrime) {
                this.face.R = setBase(this.face.R, 8);
                this.face.B = setBase(this.face.B, 8);
            } else {
                this.face.B = setBase(this.face.B, 8);
                this.face.L = setBase(this.face.L, 8);
            }
        }
        if (move === 'z') {
            for (let i = 0; i < 4; i++) this.face[dir[i]] = setBase(this.face[dir[i]], !hasPrime ? 6 : 2);
        }
        if (move === 'x2') {
            const beforeU = copy(this.face.U), beforeF = copy(this.face.F);

            this.face.U = copy(this.face.D);
            this.face.D = beforeU;
            this.face.F = copy(this.face.B);
            this.face.B = beforeF;

            this.face.R = rotateRight2(this.face.R);
            this.face.L = rotateLeft2(this.face.L);
        }
        if (move === 'y2') {
            const beforeF = copy(this.face.F), beforeR = copy(this.face.R);

            this.face.F = setBase(this.face.B, 8);
            this.face.B = setBase(beforeF, 8);
            this.face.R = copy(this.face.L);
            this.face.L = beforeR;

            this.face.U = rotateRight2(this.face.U);
            this.face.D = rotateLeft2(this.face.D);
        }
        if (move === 'z2') {
            const beforeU = copy(this.face.U), beforeL = copy(this.face.L);

            this.face.U = copy(this.face.D);
            this.face.D = beforeU;
            this.face.L = copy(this.face.R);
            this.face.R = beforeL;

            this.face.F = rotateRight2(this.face.F);
            this.face.B = rotateLeft2(this.face.B);
        }
        return this;
    }
    copy() {
        const faces = {};
        for (const key in this.face) {
            faces[key] = copy(this.face[key]);
        }
        const newCube = new Cube();
        newCube.face = faces;
        return newCube;
    }
};