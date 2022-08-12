<template>
  <container>
    <sprite :texture="enemyImg"></sprite>
  </container>
</template>

<script>
import enemyImg from "../assets/enemy.png";
import { reactive, onMounted, onUnmounted } from "vue";
import { game } from "../game";
import config from "../config";
export default {
  setup() {
    return {
      enemyImg,
    };
  },
};

export function useEnemy() {
  const enemys = reactive([]);

  // 1秒创建一个飞机
  function createEnemy() {
    setInterval(() => {
      enemys.push({
        x: Math.floor(Math.random() * 500) + 50,
        y: -100,
        width: 308,
        height: 207,
        speed:
          typeof config.enemy.speed === "function"
            ? config.enemy.speed()
            : config.enemy.speed, //Math.floor(Math.random() * 10) + 5,
        HP: 2,
      });
    }, 1000);
  }

  // 销毁敌方飞机
  function destroyEnemy(index) {
    enemys.splice(index, 1);
  }

  // 添加血条
  function hit(enemy, enemyIndex) {
    enemy.HP--;
    if (enemy.HP <= 0) {
      destroyEnemy(enemyIndex); // 销毁敌方飞机
    }
  }

  // 敌方飞机移动
  function move() {
    // const speed = 10;
    function handleTicker() {
      enemys.forEach((enemy, index) => {
        enemy.y += enemy.speed;

        // 移除
        if (enemy.y > 1300) {
          enemys.splice(index, 1);
        }
      });
    }

    onMounted(() => {
      game.ticker.add(handleTicker);
    });

    onUnmounted(() => {
      game.ticker.remove(handleTicker);
    });
  }

  move();
  createEnemy();

  return {
    enemys,
    hit,
  };
}
</script>

<style lang="scss" scoped></style>
