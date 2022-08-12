// import { createApp } from 'vue'
import App from "./App.vue";
import { getRootContainer } from "./game";
import { createApp } from "./runtime-canvas";

// pixijs
// canvas renderer

console.warn = () => {}; //  消除warning 解决卡顿

createApp(App).mount(getRootContainer());
