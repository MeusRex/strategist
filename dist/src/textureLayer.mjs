export default class TextureLayer extends PIXI.Container {
    constructor() {
        super();
        this.zIndex = 0;
        this.visible = false;
    }
    draw(texture) {
        this.removeChildren().forEach(c => c.destroy());
        this.mask = canvas.primary.mask;
        let textureSprite = PIXI.Sprite.from(texture);
        this.addChild(textureSprite);
    }
}
