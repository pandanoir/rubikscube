// Cube has six faces.
// Structure which represents cube.
//            [0, 1, 2]
//            [3, 4, 5]
//            [6, 7, 8]
// [0, 1, 2]  [0, 1, 2]  [0, 1, 2]  [0, 1, 2]
// [3, 4, 5]  [3, 4, 5]  [3, 4, 5]  [3, 4, 5]
// [6, 7, 8]  [6, 7, 8]  [6, 7, 8]  [6, 7, 8]
//            [0, 1, 2]
//            [3, 4, 5]
//            [6, 7, 8]
//   U
// L F R B
//   D
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
    constructor() {//{{{
        this.face = {
        };
        this.face.U = ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']; // white
        this.face.F = ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R']; // red
        this.face.R = ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']; // yellow
        this.face.L = ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']; // green
        this.face.B = ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']; // orange
        this.face.D = ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']; // blue
    }//}}}
    rotate(d) {//{{{
        if (d === 'R') {//{{{
            var tmp = [this.face.F[2], this.face.F[5], this.face.F[8]];
            this.face.F[2] = this.face.D[2];
            this.face.F[5] = this.face.D[5];
            this.face.F[8] = this.face.D[8];

            this.face.D[2] = this.face.B[6];
            this.face.D[5] = this.face.B[3];
            this.face.D[8] = this.face.B[0];

            this.face.B[0] = this.face.U[8];
            this.face.B[3] = this.face.U[5];
            this.face.B[6] = this.face.U[2];

            this.face.U[2] = tmp[0];
            this.face.U[5] = tmp[1];
            this.face.U[8] = tmp[2];

            this.face.R = rotateRight(this.face.R);
        }
        if (d === 'L') this.rotate('(u2)').rotate('R').rotate('(u2)');
        if (d === "L'") this.rotate('(u2)').rotate("R'").rotate('(u2)');

        if (d === 'U') this.rotate('(f)').rotate('R').rotate("(f')");
        if (d === "U'") this.rotate('(f)').rotate("R'").rotate("(f')");

        if (d === 'D') this.rotate("(f')").rotate('R').rotate('(f)');
        if (d === "D'") this.rotate("(f')").rotate("R'").rotate('(f)');

        if (d === 'F') this.rotate("(u')").rotate('R').rotate('(u)');
        if (d === "F'") this.rotate("(u')").rotate("R'").rotate('(u)');

        if (d === 'B') this.rotate('(u)').rotate('R').rotate("(u')");
        if (d === "B'") this.rotate('(u)').rotate("B'").rotate("(u')");//}}}

        if (d === 'x' || d === '(r)') {//{{{
            var beforeU = copy(this.face.U);

            this.face.U = copy(this.face.F);
            this.face.F = copy(this.face.D);
            this.face.D = setBase(this.face.B, 8);
            this.face.B = setBase(beforeU, 8);

            this.face.R = rotateRight(this.face.R);
            this.face.L = rotateLeft(this.face.L);
        }
        if (d === "x'" || d === "(r')") {
            var beforeU = copy(this.face.U);
            console.log(JSON.stringify(this.face, null, '\t'));

            this.face.U = setBase(this.face.B, 8);
            this.face.B = setBase(this.face.D, 8);
            this.face.D = copy(this.face.F);
            this.face.F = beforeU;

            this.face.R = rotateLeft(this.face.R);
            this.face.L = rotateRight(this.face.L);
            console.log(JSON.stringify(this.face, null, '\t'));
        }
        if (d === 'x2' || d === "x'2" || d === '(r2)' || d === "(r'2)") {
            var beforeU = copy(this.face.U);
            var beforeF = copy(this.face.F);

            this.face.U = copy(this.face.D);
            this.face.D = beforeU;
            this.face.F = setBase(this.face.B, 8);
            this.face.B = setBase(beforeF, 8);

            this.face.R = rotateRight2(this.face.R);
            this.face.L = rotateLeft2(this.face.L);
        }//}}}
        if (d === 'y' || d === '(u)') {//{{{
            var beforeF = copy(this.face.F);

            this.face.F = copy(this.face.R);
            this.face.R = copy(this.face.B);
            this.face.B = copy(this.face.L);
            this.face.L = beforeF;

            this.face.U = rotateRight(this.face.U);
            this.face.D = rotateLeft(this.face.D);
        }
        if (d === "y'" || d === "(u')") {
            var beforeF = copy(this.face.F);

            this.face.F = copy(this.face.L);
            this.face.L = copy(this.face.B);
            this.face.B = copy(this.face.R);
            this.face.R = beforeF;

            this.face.U = rotateLeft(this.face.U);
            this.face.D = rotateRight(this.face.D);
        }
        if (d === 'y2' || d === "y'2" || d === '(u2)' || d === "(u'2)") {
            var beforeF = copy(this.face.F);
            var beforeR = copy(this.face.R);

            this.face.F = copy(this.face.B);
            this.face.R = copy(this.face.L);
            this.face.B = beforeF;
            this.face.L = beforeR;

            this.face.U = rotateRight2(this.face.U);
            this.face.D = rotateLeft2(this.face.D);
        }//}}}
        if (d === 'z' || d === '(f)') {//{{{
            var beforeU = copy(this.face.U);

            this.face.U = setBase(this.face.L, 6);
            this.face.L = setBase(this.face.D, 6);
            this.face.D = setBase(this.face.R, 6);
            this.face.R = setBase(beforeU, 6);

            this.face.F = rotateRight(this.face.F);
            this.face.B = rotateLeft(this.face.B);
        }
        if (d === "z'" || d === "(f')") {
            var beforeU = copy(this.face.U);

            this.face.U = setBase(this.face.R, 2);
            this.face.R = setBase(this.face.D, 2);
            this.face.D = setBase(this.face.L, 2);
            this.face.L = setBase(beforeU, 2);

            this.face.F = rotateLeft(this.face.F);
            this.face.B = rotateRight(this.face.B);
        }
        if (d === 'z2' || d === "z'2" || d === '(f2)' || d === "(f'2)") {
            var beforeU = copy(this.face.U);
            var beforeL = copy(this.face.L);

            this.face.U = copy(this.face.D);
            this.face.D = beforeU;
            this.face.L = copy(this.face.R);
            this.face.R = beforeL;

            this.face.F = rotateRight2(this.face.F);
            this.face.B = rotateLeft2(this.face.B);
        }//}}}
        return this;
    }//}}}
    copy() {
        var faces = {};
        for (var key in this.face) {
            faces[key] = copy(this.face[key]);
        }
        var newCube = new Cube();
        newCube.face = faces;
        return newCube;
    }
};