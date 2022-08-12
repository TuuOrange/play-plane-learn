<template>
  <container>
    <sprite :texture="mapImg" :y="MapY1"></sprite>
    <sprite :texture="mapImg" :y="MapY2"></sprite>
  </container>
</template>

<script>
import { ref } from "@vue/reactivity";
import mapImg from "../assets/map.jpg";
import { game } from "../game";
import { onMounted, onUnmounted } from "@vue/runtime-core";
export default {
  setup() {
    const { MapY1, MapY2 } = userMove();

    return {
      mapImg,
      MapY1,
      MapY2,
    };
  },
};

function userMove() {
  const gameHeight = 1080;
  const MapY1 = ref(0);
  const MapY2 = ref(-gameHeight);

  const speed = 10;
  const handleTicker = () => {
    // 移动图片 背景上下移动
    MapY1.value += speed;
    MapY2.value += speed;

    if (MapY1.value >= gameHeight) {
      MapY1.value = -gameHeight;
    }

    if (MapY2.value >= gameHeight) {
      MapY2.value = -gameHeight;
    }
  };

  onMounted(() => {
    game.ticker.add(handleTicker); // 添加事件监听
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });

  return {
    MapY1,
    MapY2,
  };
}
</script>

<style lang="scss" scoped></style>
