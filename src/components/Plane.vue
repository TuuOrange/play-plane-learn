<template>
  <container>
    <sprite :texture="PlaneImg"></sprite>
  </container>
</template>

<script>
import PlaneImg from "../assets/plane.png";
import { reactive, onMounted, onUnmounted } from "vue";
import { planeMove } from "./PlaneMove";
export default {
  setup() {
    return {
      PlaneImg,
    };
  },
};

export function usePlane({ onAttack }) {
  const planeInfo = reactive({
    x: 250,
    y: 600,
    width: 258,
    height: 364,
  });

  // 飞机攻击
  function attack() {
    function handleAttack(e) {
      if (e.code === "Space") {
        // console.log("attack");
        onAttack &&
          onAttack({
            x: planeInfo.x,
            y: planeInfo.y,
          });
      }
    }
    onMounted(() => {
      window.addEventListener("keyup", handleAttack);
    });

    onUnmounted(() => {
      window.removeEventListener("keyup", handleAttack);
    });
  }

  planeMove({
    planeInfo,
  });

  attack();

  return {
    planeInfo,
  };
}
</script>

<style lang="scss" scoped></style>
