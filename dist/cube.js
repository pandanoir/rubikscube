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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cube = function () {
    function Cube() {
        _classCallCheck(this, Cube);

        //{{{
        this.face = {};
        this.face.U = ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W']; // white
        this.face.F = ['R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R']; // red
        this.face.R = ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y']; // yellow
        this.face.L = ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G']; // green
        this.face.B = ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']; // orange
        this.face.D = ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']; // blue
    } //}}}

    _createClass(Cube, [{
        key: 'rotate',
        value: function rotate(d) {
            //{{{
            if (d === 'R') {
                //{{{
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
            if (d === 'L' || d === "L'") this.rotate('(u2)').rotate(d === 'L' ? 'R' : "R'").rotate('(u2)');
            if (d === 'U' || d === "U'") this.rotate('(f)').rotate(d === 'U' ? 'R' : "R'").rotate("(f')");
            if (d === 'D' || d === "D'") this.rotate("(f')").rotate(d === 'D' ? 'R' : "R'").rotate('(f)');
            if (d === 'F' || d === "F'") this.rotate("(u')").rotate(d === 'F' ? 'R' : "R'").rotate('(u)');
            if (d === 'B' || d === "B'") this.rotate('(u)').rotate(d === 'B' ? 'R' : "B'").rotate("(u')"); //}}}

            if (d === 'x' || d === '(r)') {
                //{{{
                var beforeU = _copy(this.face.U);

                this.face.U = _copy(this.face.F);
                this.face.F = _copy(this.face.D);
                this.face.D = setBase(this.face.B, 8);
                this.face.B = setBase(beforeU, 8);

                this.face.R = rotateRight(this.face.R);
                this.face.L = rotateLeft(this.face.L);
            }
            if (d === "x'" || d === "(r')") {
                var beforeU = _copy(this.face.U);
                console.log(JSON.stringify(this.face, null, '\t'));

                this.face.U = setBase(this.face.B, 8);
                this.face.B = setBase(this.face.D, 8);
                this.face.D = _copy(this.face.F);
                this.face.F = beforeU;

                this.face.R = rotateLeft(this.face.R);
                this.face.L = rotateRight(this.face.L);
                console.log(JSON.stringify(this.face, null, '\t'));
            }
            if (d === 'x2' || d === "x'2" || d === '(r2)' || d === "(r'2)") {
                var beforeU = _copy(this.face.U);
                var beforeF = _copy(this.face.F);

                this.face.U = _copy(this.face.D);
                this.face.D = beforeU;
                this.face.F = setBase(this.face.B, 8);
                this.face.B = setBase(beforeF, 8);

                this.face.R = rotateRight2(this.face.R);
                this.face.L = rotateLeft2(this.face.L);
            } //}}}
            if (d === 'y' || d === '(u)') {
                //{{{
                var beforeF = _copy(this.face.F);

                this.face.F = _copy(this.face.R);
                this.face.R = _copy(this.face.B);
                this.face.B = _copy(this.face.L);
                this.face.L = beforeF;

                this.face.U = rotateRight(this.face.U);
                this.face.D = rotateLeft(this.face.D);
            }
            if (d === "y'" || d === "(u')") {
                var beforeF = _copy(this.face.F);

                this.face.F = _copy(this.face.L);
                this.face.L = _copy(this.face.B);
                this.face.B = _copy(this.face.R);
                this.face.R = beforeF;

                this.face.U = rotateLeft(this.face.U);
                this.face.D = rotateRight(this.face.D);
            }
            if (d === 'y2' || d === "y'2" || d === '(u2)' || d === "(u'2)") {
                var beforeF = _copy(this.face.F);
                var beforeR = _copy(this.face.R);

                this.face.F = _copy(this.face.B);
                this.face.R = _copy(this.face.L);
                this.face.B = beforeF;
                this.face.L = beforeR;

                this.face.U = rotateRight2(this.face.U);
                this.face.D = rotateLeft2(this.face.D);
            } //}}}
            if (d === 'z' || d === '(f)') {
                //{{{
                var beforeU = _copy(this.face.U);

                this.face.U = setBase(this.face.L, 6);
                this.face.L = setBase(this.face.D, 6);
                this.face.D = setBase(this.face.R, 6);
                this.face.R = setBase(beforeU, 6);

                this.face.F = rotateRight(this.face.F);
                this.face.B = rotateLeft(this.face.B);
            }
            if (d === "z'" || d === "(f')") {
                var beforeU = _copy(this.face.U);

                this.face.U = setBase(this.face.R, 2);
                this.face.R = setBase(this.face.D, 2);
                this.face.D = setBase(this.face.L, 2);
                this.face.L = setBase(beforeU, 2);

                this.face.F = rotateLeft(this.face.F);
                this.face.B = rotateRight(this.face.B);
            }
            if (d === 'z2' || d === "z'2" || d === '(f2)' || d === "(f'2)") {
                var beforeU = _copy(this.face.U);
                var beforeL = _copy(this.face.L);

                this.face.U = _copy(this.face.D);
                this.face.D = beforeU;
                this.face.L = _copy(this.face.R);
                this.face.R = beforeL;

                this.face.F = rotateRight2(this.face.F);
                this.face.B = rotateLeft2(this.face.B);
            } //}}}
            return this;
        } //}}}

    }, {
        key: 'copy',
        value: function copy() {
            var faces = {};
            for (var key in this.face) {
                faces[key] = _copy(this.face[key]);
            }
            var newCube = new Cube();
            newCube.face = faces;
            return newCube;
        }
    }]);

    return Cube;
}();

;
function rotateRight(face) {
    var beforeFace = _copy(face);
    var result = _copy(face);
    result[0] = beforeFace[6];
    result[1] = beforeFace[3];
    result[2] = beforeFace[0];
    result[3] = beforeFace[7];
    result[5] = beforeFace[1];
    result[6] = beforeFace[8];
    result[7] = beforeFace[5];
    result[8] = beforeFace[2];
    return result;
}

function rotateLeft(face) {
    var beforeFace = _copy(face);
    var result = _copy(face);
    result[0] = beforeFace[2];
    result[1] = beforeFace[5];
    result[2] = beforeFace[8];
    result[3] = beforeFace[1];
    result[5] = beforeFace[7];
    result[6] = beforeFace[0];
    result[7] = beforeFace[3];
    result[8] = beforeFace[6];
    return result;
}
function rotateRight2(face) {
    var beforeFace = _copy(face);
    var result = _copy(face);
    result[0] = beforeFace[8];
    result[1] = beforeFace[7];
    result[2] = beforeFace[6];
    result[3] = beforeFace[5];
    result[5] = beforeFace[3];
    result[6] = beforeFace[2];
    result[7] = beforeFace[1];
    result[8] = beforeFace[0];
    return result;
}
function rotateLeft2(face) {
    return rotateRight2(face);
}
function setBase(face, basePoint) {
    // basePoint represent the index of face
    var res;
    if (basePoint === 0) {
        res = _copy(face);
    }
    if (basePoint === 2) {
        res = rotateLeft(face);
    }
    if (basePoint === 6) {
        res = rotateRight(face);
    }
    if (basePoint === 8) {
        res = rotateLeft2(face);
    }
    return res;
}
function showCube(cube) {
    function unit(arr) {
        return [[arr[0], arr[1], arr[2]], [arr[3], arr[4], arr[5]], [arr[6], arr[7], arr[8]]];
    }
    function join(arr) {
        return '[' + arr.join(', ') + ']';
    }
    console.log(unit(cube.face.U).map(join));
}
function _copy(arr) {
    return arr.concat();
}
// showCube(new Cube().rotate('R').rotate('U'));