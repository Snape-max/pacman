// 设置位置
export function setSpritePosition(Sprite, position){
    Sprite.x = position[0];
    Sprite.y = position[1];
}

export function SpriteInit(Sprite, animationSpeed, scale=0.5, anchor=0.5){
    //初始化动画速率、缩放、锚点
    Sprite.animationSpeed = 0.1;
    Sprite.scale.set(0.5);
    Sprite.anchor.set(0.5);
}