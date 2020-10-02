const { toRefs, reactive, computed, onMounted, onUnmounted, createApp } = Vue;

const rot = ([nx, ny, nz], theta) => [
  [
    Math.cos(theta) + nx ** 2 * (1 - Math.cos(theta)),
    nx * ny * (1 - Math.cos(theta)) - nz * Math.sin(theta),
    nz * nx * (1 - Math.cos(theta)) + ny * Math.sin(theta),
    0,
  ],
  [
    nx * ny * (1 - Math.cos(theta)) + nz * Math.sin(theta),
    Math.cos(theta) + ny ** 2 * (1 - Math.cos(theta)),
    ny * nz * (1 - Math.cos(theta)) - nx * Math.sin(theta),
    0,
  ],
  [
    nz * nx * (1 - Math.cos(theta)) - ny * Math.sin(theta),
    ny * nz * (1 - Math.cos(theta)) + nx * Math.sin(theta),
    Math.cos(theta) + nz ** 2 * (1 - Math.cos(theta)),
    0,
  ],
  [0, 0, 0, 1],
];

const multiple = (a, b) => {
  const res = [...Array(a.length)].map(() => Array(b.length).fill(0));
  for (let i = 0; i < a.length; i++)
    for (let j = 0; j < b[0].length; j++)
      for (let k = 0; k < a[i].length; k++) res[i][j] += a[i][k] * b[k][j];
  return res;
};

const throttle = (f, wait) => {
  let timer = null;
  return (...args) => {
    if (timer !== null) {
      return;
    }
    f(...args);
    timer = setTimeout(() => {
      timer = null;
    }, wait);
  };
};

const use3DMatrix = () => {
  const state = reactive({
    prevMatrix: [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ],
    theta: 0,
    phi: 0,
    xAxis: [1, 0, 0, 0],
    yAxis: [0, 1, 0, 0],
    matrix: computed(({ xAxis, yAxis, theta, phi, prevMatrix } = state) =>
      multiple(multiple(rot(xAxis, phi), rot(yAxis, theta)), prevMatrix)
    ),
  });
  let isDragging = false,
    initialX = 0,
    initialY = 0;

  const mouseup = () => {
    const { xAxis, yAxis, theta, phi, matrix: _matrix } = state,
      matrix = _matrix.map((arr) => arr.concat());

    isDragging = false;
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++) state.prevMatrix[i][j] = matrix[i][j];

    const rotation = multiple(rot(xAxis, phi), rot(yAxis, theta)),
      transpose = (value) => value.reduce((acc, item) => [...acc, [item]], []);

    Object.assign(state, {
      xAxis: multiple(rotation, transpose(xAxis)).map(([value]) => value),
      yAxis: multiple(rotation, transpose(yAxis)).map(([value]) => value),

      phi: 0,
      theta: 0,
    });
  };
  const mousemove = throttle(
    ({
      clientX,
      clientY,
      view: { innerWidth: width, innerHeight: height },
    }) => {
      if (!isDragging) {
        return;
      }
      const wid = width / 2,
        hei = height / 2;
      Object.assign(state, {
        theta:
          -3 *
          (Math.asin((clientX - wid) / wid) -
            Math.asin((initialX - wid) / wid)),
        phi:
          3 *
          (Math.asin((clientY - hei) / hei) -
            Math.asin((initialY - hei) / hei)),
      });
    },
    1000 / 60
  );
  onMounted(() => {
    window.addEventListener('mouseleave', mouseup);
    window.addEventListener('mouseup', mouseup);
    window.addEventListener('mousemove', mousemove);
  });
  onUnmounted(() => {
    window.removeEventListener('mouseleave', mouseup);
    window.removeEventListener('mouseup', mouseup);
    window.removeEventListener('mousemove', mousemove);
  });
  return {
    state,
    mousedown: ({ clientX, clientY }) => {
      isDragging = true;
      initialX = clientX;
      initialY = clientY;
    },
  };
};

createApp({
  setup() {
    const rotation = [...'RLUDFBMSExyz'],
      cube = reactive(
        new Cube({
          U: '0,1,2,3,4,5,6,7,8'.split(','),
          L: '9,10,11,12,13,14,15,16,17'.split(','),
          F: '18,19,20,21,22,23,24,25,26'.split(','),
          R: '27,28,29,30,31,32,33,34,35'.split(','),
          D: '36,37,38,39,40,41,42,43,44'.split(','),
          B: '45,46,47,48,49,50,51,52,53'.split(','),
        })
      );
    const state = reactive({
      wide: false,
      square: false,
      reverse: false,
    });
    const { state: matrixState, mousedown } = use3DMatrix();

    return {
      ...toRefs(state),
      ...toRefs(matrixState),
      rotations: rotation,
      face: computed(() => cube.face),
      rotate: async (...rotations) => {
        for (const rotation of rotations)
          cube.rotate(
            `${rotation}${
              !'xyzMSE'.includes(rotation) && state.wide ? 'w' : ''
            }${state.square ? '2' : ''}${state.reverse ? `'` : ''}`
          );
      },
      getPosition: (index) =>
      [
        'corner',
        'edge-1',
        'corner',
        'edge-2',
        'center',
        'edge-3',
        'corner',
        'edge-4',
        'corner',
      ][index],
      mousedown,
    };
  },
}).mount('#app');
