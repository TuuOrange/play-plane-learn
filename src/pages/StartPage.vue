<template>
  <container>
    <sprite :texture="startPage"></sprite>
    <sprite
      :texture="startBtn"
      :x="226"
      :y="510"
      @click="startGame"
      :interactive="true"
    ></sprite>
  </container>
</template>

<script>
import startPage from "../assets/start_page.jpg";
import startBtn from "../assets/startBtn.png";
export default {
  setup(props, { emit }) {
    const startGame = () => {
      console.log("start - game");
      // emit 点击开始游戏进入游戏页面
      emit("change-page", "GamePage");
    };

    return {
      startPage,
      startBtn,
      startGame,
    };
  },
};
</script>
