<template>
  <container>
    <sprite :texture="BulletImg"></sprite>
  </container>
</template>

<script>
import { reactive } from "@vue/reactivity";
import BulletImg from "../assets/bullet.png";
import { game } from "../game";
import { onMounted, onUnmounted } from "vue";
import config from "../config";
export default {
  setup() {
    return {
      BulletImg,
    };
  },
};

export function useBullet() {
  const bullets = reactive([]);

  function addBullets(position) {
    bullets.push({ width: 61, height: 99, ...position });
  }

  // 销毁子弹
  function destoryBullet(index) {
    bullets.splice(index, 1);
  }
  // 子弹移动
  function move() {
    function handleTicker() {
      bullets.forEach((bullet, index) => {
        bullet.y -= config.plane.bullet.speed;

        if (bullet.y < -100) {
          bullets.splice(index, 1); // 移除子弹
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

  return {
    bullets,
    addBullets,
    destoryBullet,
  };
}
</script>

<style lang="scss" scoped></style>
