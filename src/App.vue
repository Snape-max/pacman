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

import { AnimatedSprite, Application, Assets, Sprite, Texture, Text} from 'pixi.js';
import { setSpritePosition, SpriteInit} from './utils/sprite'


var Mapstart = [100, 100];
var beanBias = 0;
var beanSpriteX = 25*9 + beanBias;
var beanSpriteY = 25*15 + beanBias;
var beanLocx = 9;
var beanLocy = 15;
let GhostSpeed = 0.55;
let score = 0;

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
    [3, 1, 1, 7, 0, 14, 0, 4, 24, 28, 3, 5, 0, 14, 0, 6, 1, 1, 24],
    [0, 0, 0, 0, 0, 0, 0, 2, 28, 28, 28, 2, 0, 0, 0, 0, 0, 0, 0],
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

var MapSpriteArray = new Array();
let MapTexture = [];


async function init(){
  
  await app.init({
    background:"black",
    resizeTo: window,
  })
  var game_main = document.getElementById("game_main");


  game_main.appendChild(app.canvas);

  //加载贴图
  for (let i=0;i< 29;i++){
    const teture = await Assets.load(`./assets/map/map${i}.png`);
    MapTexture.push(teture);
  }

  //拼接地图, 并生成精灵表
  for (let i=0;i<maps.length;i++){
    let tempMapSpriteRows = [];
    for(let j=0;j<maps[0].length;j++){
      
      const tempSprite = new Sprite(MapTexture[maps[i][j]]);
      tempMapSpriteRows.push(tempSprite);
      tempSprite.anchor.set(0.5);
      tempSprite.x = Mapstart[0] + j*25;
      tempSprite.y = Mapstart[1] + i*25;
      app.stage.addChildAt(tempSprite, 0);
    }
    MapSpriteArray.push(tempMapSpriteRows);
  }

  Assets.addBundle('fonts', [
    {alias: 'bitmap', src: "./assets/font/bitt.ttf"}
  ])

  await Assets.loadBundle('fonts');

  const text1 = new Text({ text: 'SCORE', style: { fontFamily: 'bitt', fontSize: 90, fill: "red"} })
  text1.anchor.set(0.5);
  text1.x = Mapstart[0] + 600;
  text1.y = Mapstart[1];
  app.stage.addChild(text1);


  await addCharacter();
  //addGhost();

  let text2 = new Text({ text: `${score}`, style: { fontFamily: 'bitt', fontSize: 90, fill: "white"} });

  text2.anchor.set(0,0);
  text2.x = Mapstart[0] + 540;
  text2.y = Mapstart[1] + 10;
  app.stage.addChild(text2);


  app.ticker.add(() => {

    text2.text = `${score}`;

    let beanCeilx = Math.ceil((beanSpriteX - 12.5)/25);
    let beanCeily = Math.ceil((beanSpriteY - 12.5)/25);
    if(maps[beanCeily][beanCeilx] == 0){
      GhostSpeed = 0.55;
      app.stage.removeChild(MapSpriteArray[beanCeily][beanCeilx]);
      const tempSprite = new Sprite(MapTexture[28]);
      tempSprite.anchor.set(0.5);
      tempSprite.x = Mapstart[0] + beanCeilx*25;
      tempSprite.y = Mapstart[1] + beanCeily*25;
      
      app.stage.addChildAt(tempSprite, 1);
      MapSpriteArray[beanCeily][beanCeilx] = tempSprite
      maps[beanCeily][beanCeilx] = 28;
      score++;

    } else {
      GhostSpeed = 0.45;
    }


  });

  


}

async function addCharacter(){
  let beanImages = ["./assets/bean/bean-re1.png", "./assets/bean/bean-re2.png"];
  let beanSprite = await CreateAnimatedSprite(beanImages);
  SpriteInit(beanSprite);
  setSpritePosition(beanSprite, [Mapstart[0] + beanSpriteX, Mapstart[1] + beanSpriteY]);
  beanSprite.play();
  app.stage.addChild(beanSprite);
  // 定义速度变量

  let speed = 0.5
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
    // 地图边界
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
    beanLocx =  Math.floor((beanSprite.x - Mapstart[0])/25);
    beanLocy = Math.floor((beanSprite.y - Mapstart[1])/25);
    beanSpriteX = beanSprite.x - Mapstart[0];
    beanSpriteY = beanSprite.y - Mapstart[1];
  });
}




async function addGhost(){

  let blueGhostImages = ["./assets/ghost-blue/ghost1.png", "./assets/ghost-blue/ghost2.png", "./assets/ghost-blue/ghost3.png"];
  let greenGhostImages = ["./assets/ghost-green/ghost1.png", "./assets/ghost-green/ghost2.png", "./assets/ghost-green/ghost3.png"];
  let pinkGhostImages = ["./assets/ghost-pink/ghost1.png", "./assets/ghost-pink/ghost2.png", "./assets/ghost-pink/ghost3.png"];
  let redGhostImages = ["./assets/ghost-red/ghost1.png", "./assets/ghost-red/ghost2.png", "./assets/ghost-red/ghost3.png"];

  let blueGhost = await CreateAnimatedSprite(blueGhostImages);
  let greenGhost = await CreateAnimatedSprite(greenGhostImages);
  let pinkGhost = await CreateAnimatedSprite(pinkGhostImages);
  let redGhost = await CreateAnimatedSprite(redGhostImages);
  let GhostSpriteArray = [blueGhost, greenGhost, pinkGhost, redGhost];

  
  let GhostInitPosition = [[8,9] , [9,9], [10,9], [9,8]]
  GhostSpriteArray.forEach((item, index) => {
    SpriteInit(item);
    setSpritePosition(item, [Mapstart[0] +GhostInitPosition[index][0]*25, Mapstart[1] +GhostInitPosition[index][1]*25])
    item.play();
    app.stage.addChild(item);

    
  });
  let ghostFirstTarget = [[4,9], [4, 13], [13, 9], [13,13]];
  let roadArray = [];
  GhostInitPosition.forEach((item, index)=>{
    let road = astar(item,ghostFirstTarget[index], map);
    roadArray.push(road)
  });


  




  let iArray = [0, 0, 0, 0];
  let CurrentGhostPosition = [0, 0, 0, 0];

  app.ticker.add(() =>{

    GhostSpriteArray.forEach((item, index) => {
      let tempGhostX = item.x - Mapstart[0];
      let tempGhostY = item.y - Mapstart[1];
      let currentGoastx = Math.floor(tempGhostX/25);
      let currentGoasty = Math.floor(tempGhostY/25);
      CurrentGhostPosition[index] = [currentGoastx, currentGoasty];
  })


   
    iArray.forEach((item, index) => {
      
      let tempGhost = GhostSpriteArray[index];
      
      let tempGhostX = tempGhost.x - Mapstart[0];
      let tempGhostY = tempGhost.y - Mapstart[1];
      let currentGoastx = Math.floor(tempGhostX/25);
      let currentGoasty = Math.floor(tempGhostY/25);
      let nextPosition = roadArray[index][iArray[index]];


      if((Math.floor(tempGhostX) != nextPosition[0]*25) || (Math.floor(tempGhostY) != nextPosition[1]*25)){

        if(nextPosition[0]*25 - tempGhostX > 0){
          tempGhost.x += GhostSpeed;
        } else if(nextPosition[0]*25 - tempGhostX < 0){
          tempGhost.x -= GhostSpeed;
        } else if(nextPosition[1]*25 - tempGhostY > 0){
          tempGhost.y += GhostSpeed;
        } else if(nextPosition[1]*25 - tempGhostY < 0){
          tempGhost.y -= GhostSpeed;
        }
      } else {

        if(iArray[index] < Math.ceil(roadArray[index].length - 1)/1.5){

          tempGhost.x = nextPosition[0]*25 + Mapstart[0];
          tempGhost.y = nextPosition[1]*25 + Mapstart[1];
            iArray[index] = iArray[index] + 1;


        } else {
          roadArray[index] = astar([currentGoastx,currentGoasty],[beanLocx,beanLocy], map);
          iArray[index] = 0;
        }
      }
    })

  
  
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

function hitTestRectangle(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return boundsA.intersects(boundsB);
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
