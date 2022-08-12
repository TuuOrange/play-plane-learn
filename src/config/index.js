export default {
  // 敌方飞机
  enemy: {
    // speed: 10,
    speed: () => {
      return Math.floor(Math.random() * 10) + 5;
    },
  },
  // 我方飞机
  plane: {
    // 子弹
    bullet: {
      speed: 10,
    },
  },
};
