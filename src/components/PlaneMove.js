/**
 * 我方飞机移动的逻辑
 */

import { onMounted, onUnmounted } from "vue";
import { game } from "../game";

export function planeMove({ planeInfo }) {
  // move
  const speed = 10;
  // let keyCode = "";
  // let leftAndRightKeyCode = "";
  // let upAndDownKeyCode = "";

  let leftAndRightArr = [];
  let upAndDownArr = [];

  const upCommand = {
    type: "upAndDown",
    name: "up",
    dir: -1,
  };

  const downCommand = {
    type: "upAndDown",
    name: "down",
    dir: 1,
  };

  const leftCommand = {
    type: "leftAndRight",
    name: "left",
    dir: -1,
  };

  const rightCommand = {
    type: "leftAndRight",
    name: "right",
    dir: 1,
  };

  // 映射
  const map = {
    ArrowUp: upCommand,
    ArrowDown: downCommand,
    ArrowLeft: leftCommand,
    ArrowRight: rightCommand,
  };

  // 判断是上下 还是 左右
  function getArrByCommand(command) {
    if (command.type === "leftAndRight") {
      return leftAndRightArr;
    } else {
      return upAndDownArr;
    }
  }

  // 判断数组中是否已经存在数据
  function isExistCommand(command) {
    const arr = getArrByCommand(command);
    return arr.indexOf(command) !== -1; // 存在
  }

  // 添加 command
  function addCommand(command) {
    let arr = getArrByCommand(command);
    arr.unshift(command);
  }

  // 移除 command
  function removeCommand(command) {
    let arr = getArrByCommand(command);
    const index = arr.indexOf(command);
    arr.splice(index, 1);
  }

  function handleKeyup(e) {
    const command = map[e.code];

    if (command && isExistCommand(command)) {
      // 如果存在才删除
      removeCommand(command);
    }
  }

  function handleKeydown(e) {
    const command = map[e.code];

    if (command && !isExistCommand(command)) {
      // 如果不存在的话再添加
      addCommand(command);
    }
  }

  function handleTicker() {
    const leftAndRightCommand = leftAndRightArr[0];
    if (leftAndRightCommand) {
      planeInfo.x += leftAndRightCommand.dir * speed;
    }

    const upAndRightCommand = upAndDownArr[0];
    if (upAndRightCommand) {
      planeInfo.y += upAndRightCommand.dir * speed;
    }
  }

  // function handleKeydown(e) {
  //   // console.log(e.code);
  //   // keyCode = e.code;
  //   if (e.code === "ArrowUp" || e.code === "ArrowDown") {
  //     upAndDownKeyCode = e.code;
  //   }

  //   if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
  //     leftAndRightKeyCode = e.code;
  //   }
  // }

  // function handleKeyup(e) {
  //   // keyCode = "";
  //   if (e.code === "ArrowUp" || e.code === "ArrowDown") {
  //     upAndDownKeyCode = "";
  //   }

  //   if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
  //     leftAndRightKeyCode = "";
  //   }
  // }

  // function handleTicker() {
  //   if (upAndDownKeyCode === "ArrowUp" || upAndDownKeyCode === "ArrowDown") {
  //     if (upAndDownKeyCode === "ArrowUp") {
  //       planeInfo.y -= speed;
  //     }
  //     if (upAndDownKeyCode === "ArrowDown") {
  //       planeInfo.y += speed;
  //     }
  //   }

  //   if (leftAndRightKeyCode === "ArrowLeft" || leftAndRightKeyCode === "ArrowRight") {
  //     if (leftAndRightKeyCode === "ArrowLeft") {
  //       planeInfo.x -= speed;
  //     }
  //     if (leftAndRightKeyCode === "ArrowRight") {
  //       planeInfo.x += speed;
  //     }
  //   }
  // }

  onMounted(() => {
    game.ticker.add(handleTicker);
    window.addEventListener("keyup", handleKeyup);
    window.addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
    window.removeEventListener("keyup", handleKeyup);
    window.removeEventListener("keydown", handleKeydown);
  });
}
