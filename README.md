# play-plane

飞机大战 - Vue3 + canvas(pixi.js) + custom renderer 学习

跟着老师一起敲的，但是想记录下来，中途自己敲再与老师想法相比较

老师封装的很好，有很多地方值得我学习

## 代码解释
1. 通过 `Application/pixijs` 创建一个画布并添加到body中，将画布中的内容通过 `renderer` 挂载
2. 设置`Container`区域以及`Sprite、Texture`引入图片
3. 通过**composition api**完成逻辑设计
4. 利用 `emit` 进行组件之间方法的传递（组件跳转）
5. 我方飞机移动：做一个地图映射，当`plane`向上下或者左右移动（`keydown`）时，将数据存入到堆栈的头部中，当松开键盘按键（`keyup`）将移动方式（`command`）销毁（推出数组），并用`ticker/pixijs`使`plane`有连贯性的动作（动作流畅）
6. 飞机碰撞：utils中进行两个对象的碰撞检测，当一方距离`0`处的长度小于等于另一方的`长度+宽度`，则两个对象发生碰撞。当我方飞机与敌方飞机发生碰撞时，gameover（跳转到结束页）；当我方子弹与敌方飞机发生碰撞（HP:2 = 飞机被打2次），则子弹与飞机销毁
7. 敌方飞机随机创造：每隔1秒随机生成敌方飞机的`x`坐标以及速度，推入到`enemys`数组当中，当飞机离开界面或者被销毁，则将数组中的飞机销毁，利用`ticker`设置飞机的移动（从上往下） --- （子弹`bullet`同理通过`ticker`设置子弹从发出位置向上的移动）
8. 经过`Plane`中的`usePlane`中的回调函数将当前我方飞机的位置作为子弹发出的位置发出（将位置`push`到子弹的数组`bullets`中）


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
