<template>
  <container>
    <start-page
      v-if="currentPage === 'StartPage'"
      @change-page="handleChangePage"
    ></start-page>
    <game-page
      v-else-if="currentPage === 'GamePage'"
      @change-page="handleChangePage"
    ></game-page>
    <end-page
      v-else-if="currentPage === 'EndPage'"
      @change-page="handleChangePage"
    ></end-page>
  </container>
</template>

<script>
import StartPage from "./pages/StartPage.vue";
import GamePage from "./pages/GamePage.vue";
import EndPage from "./pages/EndPage.vue";
import { ref } from "@vue/reactivity";

export default {
  name: "App",
  components: { StartPage, GamePage, EndPage },
  setup() {
    const currentPage = ref("StartPage");

    function handleChangePage(pageName) {
      currentPage.value = pageName;
    }

    return {
      currentPage,
      handleChangePage,
    };
  },
};
</script>

<style></style>
