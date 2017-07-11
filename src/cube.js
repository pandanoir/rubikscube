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
const baseRotate = trans => face => trans.map(x => face[x]);
const rotateRight = baseRotate([6, 3, 0, 7, 4, 1, 8, 5, 2]);
const rotateLeft = baseRotate([2, 5, 8, 1, 4, 7, 0, 3, 6]);
const rotateRight2 = baseRotate([8, 7, 6, 5, 4, 3, 2, 1, 0]);
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

export default class Cube {
    constructor(face) {
        this.face = face || {
            U: [...'WWWWWWWWW'], // white
            F: [...'RRRRRRRRR'], // red
            R: [...'YYYYYYYYY'], // yellow
            L: [...'GGGGGGGGG'], // green
            B: [...'OOOOOOOOO'], // orange
            D: [...'BBBBBBBBB'] // blue
        };
    }
    rotate(d) {
        const hasPrime = d.includes("'");
        const isTwice = d.includes('2');
        const move = d.replace(/['2]/g, '')
            .replace(/\(([ruf])\)/, (_,a) => (a === 'r' ? 'x' : a === 'u' ? 'y' : 'z')); // d.slice(0, -1) cannot remove prime from "(r')".
        const isCubeRotation = 'xyz'.includes(move);
        if (isTwice) {
            this.rotate(move + hasPrime ? "'" : '');
            this.rotate(move + hasPrime ? "'" : '');
            return this;
        }
        if (move === 'R') {
            const dir = [...'UFDB'];
            if (hasPrime) dir.reverse();

            const tmp = [this.face[dir[0]][2], this.face[dir[0]][5], this.face[dir[0]][8]];
            for (let i = 0; i < 3; i++) {
                const now = this.face[dir[i]], next = this.face[dir[i + 1]];
                now[2] = next[2]; now[5] = next[5]; now[8] = next[8];
            }
            [this.face[dir[3]][2], this.face[dir[3]][5], this.face[dir[3]][8]] = tmp;

            this.face.R = (!hasPrime ? rotateRight : rotateLeft)(this.face.R);
        } else if ('LUDFB'.includes(move)) {
            const preMove = {
                'L': ['(u2)', '(u2)'],
                'U': ['(f)', "(f')"],
                'D': ["(f')", '(f)'],
                'F': ["(u')", '(u)'],
                'B': ['(u)', "(u')"]
            }[move];
            this.rotate(preMove[0])
                .rotate(`R${hasPrime ? "'" : ''}`)
                .rotate(preMove[1]);
        } else if ('MSE'.includes(move)) {
            if (move === 'S') this.rotate('(u)');
            if (move === 'E') this.rotate('(f)');
            const dir = [...'BDFU'];
            if (hasPrime) dir.reverse();

            const tmp = [this.face[dir[0]][1], this.face[dir[0]][4], this.face[dir[0]][7]];
            for (let i = 0; i < 3; i++) {
                const now = this.face[dir[i]], next = this.face[dir[i + 1]];
                now[1] = next[1]; now[4] = next[4]; now[7] = next[7];
            }
            [this.face[dir[3]][1], this.face[dir[3]][4], this.face[dir[3]][7]] = tmp;

            if (move === 'S') this.rotate("(u')");
            if (move === 'E') this.rotate("(f')");
        } else if (isCubeRotation) {
            const dir = [...{x: 'UFDB', y: 'LFRB', z: 'ULDR'}[move]];
            const R = {x: 'R', y: 'U', z: 'F'}[move], L = {x: 'L', y: 'D', z: 'B'}[move];
            if (hasPrime) dir.reverse();

            const before = copy(this.face[dir[0]]);
            for (let i = 0; i < 3; i++) this.face[dir[i]] = copy(this.face[dir[i + 1]]);
            this.face[dir[3]] = before;

            this.face[R] = (!hasPrime ? rotateRight : rotateLeft)(this.face[R]);
            this.face[L] = (!hasPrime ? rotateLeft : rotateRight)(this.face[L]);
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
        }
        return this;
    }
    copy() {
        const faces = {};
        for (var key of Object.keys(this.face)) {
            faces[key] = copy(this.face[key]);
        }
        const newCube = new Cube();
        newCube.face = faces;
        return newCube;
    }
};