<template>
  <container>
    <Map></Map>
    <Plane :x="planeInfo.x" :y="planeInfo.y"></Plane>
    <Enemy
      v-for="(enemy, index) in enemys"
      :key="index"
      :x="enemy.x"
      :y="enemy.y"
    ></Enemy>
    <Bullet
      v-for="(bullet, index) in bullets"
      :key="index"
      :x="bullet.x"
      :y="bullet.y"
    ></Bullet>
  </container>
</template>

<script>
import Map from "../components/Map.vue";
import Plane, { usePlane } from "../components/Plane.vue";
import Enemy, { useEnemy } from "../components/Enemy.vue";
import Bullet, { useBullet } from "../components/Bullet.vue";
import { useFighting } from "./fighting";
export default {
  components: { Map, Plane, Enemy, Bullet },
  setup(props, { emit }) {
    const { planeInfo } = usePlane({
      onAttack(position) {
        addBullets(position);
      },
    }); // 友方飞机移动

    // array -> 数据结构
    const { enemys, hit } = useEnemy(); // 敌方飞机移动数据

    const { bullets, addBullets, destoryBullet } = useBullet(); // 子弹数据

    // 碰撞
    function gameover() {
      emit("change-page", "EndPage");
    }
    useFighting({
      planeInfo,
      enemys,
      bullets,
      gameover,
      destoryBullet,
      hit,
    });

    return {
      planeInfo,
      enemys,
      bullets,
    };
  },
};
</script>

<style lang="scss" scoped></style>
