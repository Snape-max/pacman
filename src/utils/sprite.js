// 设置位置
export function setSpritePosition(Sprite, position){
    Sprite.x = position[0];
    Sprite.y = position[1];
}

export function SpriteInit(Sprite, animationSpeed=0.1, scale=0.5, anchor=0.5){
    //初始化动画速率、缩放、锚点
    Sprite.animationSpeed = animationSpeed;
    Sprite.scale.set(scale);
    Sprite.anchor.set(anchor);
}