import EndPage from '@/pages/EndPage';
<template>
  <container>
    <sprite :texture="endPage"></sprite>
    <sprite
      :texture="restartBtn"
      :x="226"
      :y="510"
      @click="resetStartGame"
      :interactive="true"
    ></sprite>
  </container>
</template>

<script>
import endPage from "../assets/end_page.jpg";
import restartBtn from "../assets/restartBtn.png";
export default {
  setup(props, { emit }) {
    const resetStartGame = () => {
      emit("change-page", "GamePage");
    };

    return {
      endPage,
      restartBtn,
      resetStartGame,
    };
  },
};
</script>

<style lang="scss" scoped></style>
