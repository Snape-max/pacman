<template>
<title>吃豆人</title>
<div id="game_main"></div>
</template>

<script setup>
import { astar } from './utils/astar';

  // // 假设我们有一个示例地图
  // const exampleMap = [
  //   [1, 1, 1, 1, 1],
  //   [1, 0, 0, 0, 1],
  //   [1, 0, 1, 0, 1],
  //   [1, 0, 0, 0, 1],
  //   [1, 1, 1, 1, 1],
  // ];
  
  // // 定义起始和结束坐标
  // const start = [1, 1];
  // const end = [3, 3];
  // const result = astar(start, end, exampleMap);
  // console.log(result);

import { AnimatedSprite, Application, Assets, Container, Sprite, Texture, v8_0_0} from 'pixi.js';
import { setSpritePosition, SpriteInit} from './utils/sprite'


var Mapstart = [100, 100];
var beanBias = 0;
var beanSpriteX = 25*9 + beanBias;
var beanSpriteY = 25*15 + beanBias;
var beanx = 9;
var beany = 15;

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

  // let road = astar([9,8],[1,3], map);
  // console.log(road);

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

  


  await addCharacter();
  addGhost();




  


}

async function addCharacter(){
  let beanImages = ["./assets/bean/bean-re1.png", "./assets/bean/bean-re2.png"];
  let beanSprite = await CreateAnimatedSprite(beanImages);
  SpriteInit(beanSprite);
  setSpritePosition(beanSprite, [Mapstart[0] + beanSpriteX, Mapstart[1] + beanSpriteY]);
  beanSprite.play();
  app.stage.addChild(beanSprite);
  // 定义速度变量

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
              beanflip = 0.5;
              beandirection = 3*Math.PI/2;
              break;
          case 'a':
              nextDirection = 3;
              beanflip = -0.5;
              beandirection = 0;
              break;
          case 's':
              nextDirection = 2
              beanflip = 0.5;
              beandirection = Math.PI/2;
              break;
          case 'd':
              nextDirection = 1;
              beanflip = 0.5;
              beandirection = 0;
              break;
      }
  }

  let loc = {
    x:0,
    y:0,
  };
  let tempx, tempy = 0;
  let nowDirextion = 1;
  // 每一帧更新渲染
  app.ticker.add(() => {

    if(beanSprite.x > Mapstart[0] + 18*25){
      beanSprite.x = Mapstart[0];
    }
    if(beanSprite.y > Mapstart[1] + 20*25){
      beanSprite.y = Mapstart[1];
    }
    if(beanSprite.x < Mapstart[0]){
      beanSprite.x = Mapstart[0]  + 18*25;
    }
    if(beanSprite.y < Mapstart[1]){
      beanSprite.y = Mapstart[1]  + 20*25;
    }


    switch(nowDirextion){
      case 1:
        tempx = beanSprite.x + speed;
        tempy = beanSprite.y;
        loc.x = Math.floor((tempx - Mapstart[0])/25);
        loc.y = Math.floor((tempy - Mapstart[0])/25);
        if (!map[loc.y][loc.x+1]){
          beanSprite.x += speed;
          beanSprite.rotation = beandirection;
          beanSprite.scale._x = beanflip;
        } else {
          beanSprite.x = loc.x*25+Mapstart[0];
          beanSprite.y = loc.y*25+Mapstart[1];
        }
        break;
      case 2:
        tempx = beanSprite.x;
        tempy = beanSprite.y  + speed;
        loc.x = Math.floor((tempx - Mapstart[0])/25);
        loc.y = Math.floor((tempy - Mapstart[0])/25);
        if (!map[loc.y+1][loc.x]){
          beanSprite.y += speed;
          beanSprite.rotation = beandirection;
          beanSprite.scale._x = beanflip;
        }else {
          beanSprite.x = loc.x*25+Mapstart[0];
          beanSprite.y = loc.y*25+Mapstart[1];
        }
        break;
      case 3:
        tempx = beanSprite.x - speed;
        tempy = beanSprite.y;
        loc.x = Math.floor((tempx - Mapstart[0])/25);
        loc.y = Math.floor((tempy - Mapstart[0])/25);
        if (!map[loc.y][loc.x]){
          beanSprite.x -= speed;
          beanSprite.rotation = beandirection;
          beanSprite.scale._x = beanflip;
        }else {
          beanSprite.x = (loc.x + 1)*25+Mapstart[0];
          beanSprite.y = loc.y*25+Mapstart[1];
        }
        break;
      case 4:
        tempx = beanSprite.x;
        tempy = beanSprite.y  - speed;
        loc.x = Math.floor((tempx - Mapstart[0])/25);
        loc.y = Math.floor((tempy - Mapstart[0])/25);
        if (!map[loc.y][loc.x]){
          beanSprite.rotation = beandirection;
          beanSprite.scale._x = beanflip;
          beanSprite.y -= speed;
        }else {
          beanSprite.x = loc.x*25+Mapstart[0];
          beanSprite.y = (loc.y+1) *25+Mapstart[1];
        }
        break;
    }

    if (((beanSprite.x - Mapstart[0])%25 == 0) && ((beanSprite.y - Mapstart[1])%25 == 0)){
          nowDirextion = nextDirection;
    }
    beanx =  Math.floor((beanSprite.x - Mapstart[0])/25);
    beany = Math.floor((beanSprite.y - Mapstart[0])/25);
  });
}


let GhostSpeed = 0.5;
let accumulator = 0;
async function addGhost(){

  let blueGhostImages = ["./assets/ghost-blue/ghost1.png", "./assets/ghost-blue/ghost2.png", "./assets/ghost-blue/ghost3.png"];
  let greenGhostImages = ["./assets/ghost-green/ghost1.png", "./assets/ghost-green/ghost2.png", "./assets/ghost-green/ghost3.png"];
  let pinkGhostImages = ["./assets/ghost-pink/ghost1.png", "./assets/ghost-pink/ghost2.png", "./assets/ghost-pink/ghost3.png"];
  let redGhostImages = ["./assets/ghost-red/ghost1.png", "./assets/ghost-red/ghost2.png", "./assets/ghost-red/ghost3.png"];

  let blueGhost = await CreateAnimatedSprite(blueGhostImages);
  let greenGhost = await CreateAnimatedSprite(greenGhostImages);
  let pinkGhost = await CreateAnimatedSprite(pinkGhostImages);
  let redGhost = await CreateAnimatedSprite(redGhostImages);
  SpriteInit(blueGhost);
  SpriteInit(greenGhost);
  SpriteInit(pinkGhost);
  SpriteInit(redGhost);
  setSpritePosition(blueGhost, [Mapstart[0] + 25*8, Mapstart[1] + 25*9]);
  setSpritePosition(greenGhost, [Mapstart[0] + 25*9, Mapstart[1] + 25*9]);
  setSpritePosition(pinkGhost, [Mapstart[0] + 25*10, Mapstart[1] + 25*9]);
  setSpritePosition(redGhost, [Mapstart[0] + 25*9, Mapstart[1] + 25*8]);
  blueGhost.play();
  greenGhost.play();
  pinkGhost.play();
  redGhost.play();
  app.stage.addChild(blueGhost);
  app.stage.addChild(greenGhost);
  app.stage.addChild(pinkGhost);
  app.stage.addChild(redGhost);

  let road = astar([9,8],[beanx,beany], map);
  console.log(road);

  let i = 0;
  let redGhostx = 0;
  let redGhosty = 0;
  app.ticker.add((deltaTime) =>{
   
    
    redGhostx = redGhost.x-Mapstart[0]
    redGhosty = redGhost.y-Mapstart[1];

    let nextPosition = road[i];



    if((redGhostx != nextPosition[0]*25) || (redGhosty != nextPosition[1]*25)){
      if(nextPosition[0]*25 - redGhostx > 0){
        redGhost.x += GhostSpeed;
      } else if(nextPosition[0]*25 - redGhostx < 0){
        redGhost.x -= GhostSpeed;
      } else if(nextPosition[1]*25 - redGhosty > 0){
        redGhost.y += GhostSpeed;
      } else if(nextPosition[1]*25 - redGhosty < 0){
        redGhost.y -= GhostSpeed;
      }
    } else {
      if(i < road.length-1){
        i = i + 1;
      } else {
        let currentGoastx = Math.floor(redGhostx/25);
        let currentGoasty = Math.floor(redGhosty/25);
        console.log([[currentGoastx,currentGoasty],[beanx,beany]])
        road = astar([currentGoastx,currentGoasty],[beanx,beany], map);
        console.log(road);
        i = 0;
      }
    }

  

  
  
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
