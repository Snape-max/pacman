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


var Mapstart = [100, 100];
var beanBias = 0;
var beanSpriteX = 225 + beanBias;
var beanSpriteY = 375 + beanBias;

const app = new Application();
const map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
        [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    const maps = [
        [4, 1, 1, 1, 1, 1, 1, 1, 1, 10, 1, 1, 1, 1, 1, 1, 1, 1, 5],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 23, 22, 0, 23, 21, 22, 0, 14, 0, 23, 21, 22, 0, 23, 22, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 15, 16, 0, 13, 0, 15, 11, 17, 11, 16, 0, 13, 0, 15, 16, 0, 2],
        [2, 0, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 0, 2],
        [6, 1, 1, 5, 0, 18, 11, 16, 0, 14, 0, 15, 11, 20, 0, 4, 1, 1, 7],
        [28, 28, 28, 2, 0, 12, 0, 0, 0, 0, 0, 0, 0, 12, 0, 2, 28, 28, 28],
        [3, 1, 1, 7, 0, 14, 0, 4, 24, 0, 3, 5, 0, 14, 0, 6, 1, 1, 24],
        [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
        [3, 1, 1, 5, 0, 13, 0, 6, 1, 1, 1, 7, 0, 13, 0, 4, 1, 1, 24],
        [28, 28, 28, 2, 0, 12, 0, 0, 0, 0, 0, 0, 0, 12, 0, 2, 28, 28, 28],
        [4, 1, 1, 7, 0, 14, 0, 15, 11, 17, 11, 16, 0, 14, 0, 6, 1, 1, 5],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 15, 25, 0, 15, 11, 16, 0, 14, 0, 15, 11, 16, 0, 26, 16, 0, 2],
        [2, 0, 0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 2],
        [9, 16, 0, 14, 0, 13, 0, 15, 11, 17, 11, 16, 0, 13, 0, 14, 0, 15, 8],
        [2, 0, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 12, 0, 0, 0, 0, 2],
        [2, 0, 15, 11, 11, 19, 11, 16, 0, 14, 0, 15, 11, 19, 11, 11, 16, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    ]

    console.log(map);
    

async function init(){
  
  await app.init({
    background:"black",
    resizeTo: window,
  })
  var game_main = document.getElementById("game_main");


  game_main.appendChild(app.canvas);
  console.log(maps)
  let MapSpriteArray = [];
  for (let i=0;i<= 26;i++){
    const teture = await Assets.load(`./assets/map/map${i}.png`);
    const tempSprite = new Sprite(teture);
    MapSpriteArray.push(tempSprite);
  }

  for (let i=0;i<maps.length;i++){
    for(let j=0;j<maps[0].length;j++){
      const teture = await Assets.load(`./assets/map/map${maps[i][j]}.png`);
      const tempSprite = new Sprite(teture);
      tempSprite.anchor.set(0.5);
      tempSprite.x = Mapstart[0] + j*25;
      tempSprite.y = Mapstart[1] + i*25;
      app.stage.addChild(tempSprite);
    }
  }

  addCharacter();




  


}

async function addCharacter(){
  let beanImages = ["./assets/bean/bean-re1.png", "./assets/bean/bean-re2.png"];
  let blueGhostImages = ["./assets/ghost-blue/ghost1.png", "./assets/ghost-blue/ghost2.png", "./assets/ghost-blue/ghost3.png"];
  let greenGhostImages = ["./assets/ghost-green/ghost1.png", "./assets/ghost-green/ghost2.png", "./assets/ghost-green/ghost3.png"];
  let pinkGhostImages = ["./assets/ghost-pink/ghost1.png", "./assets/ghost-pink/ghost2.png", "./assets/ghost-pink/ghost3.png"];
  let redGhostImages = ["./assets/ghost-red/ghost1.png", "./assets/ghost-red/ghost2.png", "./assets/ghost-red/ghost3.png"];
  let beanSprite = await CreateAnimatedSprite(beanImages);
  SpriteInit(beanSprite, 0.1, 0.5, 1);
  setSpritePosition(beanSprite, [Mapstart[0] + beanSpriteX, Mapstart[1] + beanSpriteY]);
  beanSprite.play();
  app.stage.addChild(beanSprite);

  // 定义速度变量
  let velocityX = 0.5;
  let velocityY = 0.5;
  let speed = 0.5;
  let beandirection = 0;
  let beanflip = 0.5;

  let nextDirection = 1;
  // 键盘事件监听器，更新速度变量
  document.addEventListener('keydown', onKeyPress);
  function onKeyPress(event) {
      switch (event.key) {
          case 'w':
              nextDirection = 4;
              break;
          case 'a':
              nextDirection = 3;
              break;
          case 's':
              nextDirection = 2
              break;
          case 'd':
              nextDirection = 1;
              break;
      }
  }

  let loc = NaN;
  let next = NaN;
  let nowDirextion = 1;
  // 每一帧更新渲染
  app.ticker.add(() => {
    loc = {
      x: Math.floor((beanSprite.x - Mapstart[0])/25),
      y: Math.floor((beanSprite.y - Mapstart[1])/25),
    };
    next = {
      w: !map[loc.y-1][loc.x],
      a: !map[loc.y][loc.x-1],
      s: !map[loc.y+1][loc.x],
      d: !map[loc.y][loc.x+1],
    };
    if(next.w && nextDirection == 4){
      if(beanSprite.y <= loc.y*25 + Mapstart[1]){
        beanSprite.y -= velocityY;
        beandirection = 3*Math.PI/2;
        beanflip = 0.5;
        nowDirextion = nextDirection;
      } else {
        switch(nowDirextion){
          case 1:
            beanSprite.x += velocityX;
            break;
          case 2:
            beanSprite.y += velocityY;
            break;
          case 3:
            beanSprite.x -= velocityX;
            break;
          case 4:
            beanSprite.y -= velocityY;
            break;
        }
      }
    }else if(next.a && nextDirection == 3){
      if(beanSprite.x >= loc.x*25 + Mapstart[0]){
        beanSprite.x -= velocityX;

        beandirection = 0;
        beanflip = -0.5;
        nowDirextion = nextDirection;

      } else {
        switch(nowDirextion){
          case 1:
            beanSprite.x += velocityX;
            break;
          case 2:
            beanSprite.y += velocityY;
            break;
          case 3:
            beanSprite.x -= velocityX;
            break;
          case 4:
            beanSprite.y -= velocityY;
            break;
        }
      }
    }else if(next.s && nextDirection == 2){
      if(beanSprite.y >= loc.y*25 + Mapstart[1]){
        beanSprite.y += velocityY;

        beandirection = Math.PI/2;
        beanflip = 0.5;
        nowDirextion = nextDirection;
      } else {
        switch(nowDirextion){
          case 1:
            beanSprite.x += velocityX;
            break;
          case 2:
            beanSprite.y += velocityY;
            break;
          case 3:
            beanSprite.x -= velocityX;
            break;
          case 4:
            beanSprite.y -= velocityY;
            break;
        }
      }
    }else if(next.d && nextDirection == 1){
      if(beanSprite.x >= loc.x*25 + Mapstart[0]){
        beanSprite.x += velocityX;
        beandirection = 0;
        beanflip = 0.5;
        nowDirextion = nextDirection;
      } else {
        switch(nowDirextion){
          case 1:
            beanSprite.x += velocityX;
            break;
          case 2:
            beanSprite.y += velocityY;
            break;
          case 3:
            beanSprite.x -= velocityX;
            break;
          case 4:
            beanSprite.y -= velocityY;
            break;
        }
      }
    }


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
