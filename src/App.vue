<template>
<title>吃豆人</title>
<div id="game_main"></div>
</template>

<script setup>
// import { astar } from './utils/astar';

//   // 假设我们有一个示例地图
//   const exampleMap = [
//     [1, 1, 1, 1, 1],
//     [1, 0, 0, 0, 1],
//     [1, 0, 1, 0, 1],
//     [1, 0, 0, 0, 1],
//     [1, 1, 1, 1, 1],
//   ];
  
//   // 定义起始和结束坐标
//   const start = [1, 1];
//   const end = [3, 3];
//   const result = astar(start, end, exampleMap);
//   console.log(result);

import { AnimatedSprite, Application, Assets, Container, Sprite, Texture} from 'pixi.js';
import { setSpritePosition, SpriteInit} from './utils/sprite'

var beanSpriteX = 100;
var beanSpriteY = 500;
const app = new Application();

async function init(){
  
  await app.init({
    background:"black",
    resizeTo: window,
  })
  var game_main = document.getElementById("game_main");


  game_main.appendChild(app.canvas);

  let beanImages = ["./assets/bean/bean-re1.png", "./assets/bean/bean-re2.png"];
  let blueGhostImages = ["./assets/ghost-blue/ghost1.png", "./assets/ghost-blue/ghost2.png", "./assets/ghost-blue/ghost3.png"];
  let greenGhostImages = ["./assets/ghost-green/ghost1.png", "./assets/ghost-green/ghost2.png", "./assets/ghost-green/ghost3.png"];
  let pinkGhostImages = ["./assets/ghost-pink/ghost1.png", "./assets/ghost-pink/ghost2.png", "./assets/ghost-pink/ghost3.png"];
  let redGhostImages = ["./assets/ghost-red/ghost1.png", "./assets/ghost-red/ghost2.png", "./assets/ghost-red/ghost3.png"];



  let beanSprite = await CreateAnimatedSprite(beanImages);
  SpriteInit(beanSprite, 0.1, 0.5, 0.5);
  setSpritePosition(beanSprite, [beanSpriteX, beanSpriteY]);
  beanSprite.play();
  app.stage.addChild(beanSprite);



  // 定义速度变量
  let velocityX = 0;
  let velocityY = 0;
  let beandirection = 0;
  let beanflip = 0.5;
  let speed = 1; // 这是每秒移动的像素数

  // 键盘事件监听器，更新速度变量
  document.addEventListener('keydown', onKeyPress);
  function onKeyPress(event) {
      switch (event.key) {
          case 'w':
              velocityY = -speed;
              beandirection = 3*Math.PI/2;
              beanflip = 0.5;
              break;
          case 'a':
              velocityX = -speed;
              beandirection = 0;
              beanflip = -0.5;
              break;
          case 's':
              velocityY = speed;
              beandirection = Math.PI/2;
              beanflip = 0.5;
              break;
          case 'd':
              velocityX = speed;
              beandirection = 0;
              beanflip = 0.5;
              break;
      }
  }

  document.addEventListener('keyup', onKeyRelease);
  function onKeyRelease(event) {
      switch (event.key) {
          case 'w':
          case 's':
              velocityY = 0;
              break;
          case 'a':
          case 'd':
              velocityX = 0;
              break;
      }
  }
  // 每一帧更新渲染
  app.ticker.add(() => {
    beanSprite.x += velocityX;
    beanSprite.y += velocityY;
    beanSprite.rotation = beandirection;
    beanSprite.scale._x = beanflip;
  });


}

init(); 




// 加载动画精灵
async function CreateAnimatedSprite(sources){
  let tempTextureArray = [];
  for (let i=0;i< sources.length;i++){
    const texture = await Assets.load(sources[i]);
    tempTextureArray.push(texture);
  }
  return new AnimatedSprite(tempTextureArray);
}




</script>

<style>
body {
  background-color: rgba(60, 60, 60, 0.595);
  margin: 0;
  padding: 0;
}
#game_main{
  height: 80%;
  width: 100%;;
  position: relative;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

#game_main > canvas{
  display: block; /* 防止canvas底部留白 */
  margin: auto; /* 如果不使用flex布局，可以尝试这种方式 */
}

#game_info{
  display: block;
  height: 20%;
  width: 100%;
  text-align: center;
}

#game_info p{
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 24px;
}

</style>
