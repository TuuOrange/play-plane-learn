/**
 * 我方飞机与敌方飞机
 * 敌方飞机与我方子弹
 * 的碰撞
 */

import { onMounted, onUnmounted } from "vue";
import { game } from "../game";
import { hitTestObject } from "../utils";

export function useFighting({ planeInfo, enemys, bullets, gameover, destoryBullet, hit }) {
  // fighting
  function handleTicker() {
    // 我方飞机和敌方飞机的碰撞
    enemys.forEach((enemy) => {
      if (hitTestObject(planeInfo, enemy)) {
        // console.log("hit");
        // console.log(planeInfo, enemy);
        gameover();
      }
    });

    // 敌方飞机和我方子弹的碰撞
    enemys.forEach((enemy, index) => {
      bullets.forEach((bullet, bIndex) => {
        if (hitTestObject(enemy, bullet)) {
          // 低层次的代码
          // 销毁
          // enemys.splice(index, 1);
          // bullets.splice(bIndex, 1);
          hit(enemy, index); // 销毁敌方飞机
          destoryBullet(bIndex); // 销毁子弹
        }
      });
    });
  }

  onMounted(() => {
    game.ticker.add(handleTicker);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
  });
}
