import { AntialiasingShader as AntialiasingShaderProg } from "./shaders/antialiasing.mjs";
import { CoreShader as CoreShaderProg } from "./shaders/core.mjs";
export default class TextureLayer extends PIXI.Container {
    constructor() {
        super();
        this.zIndex = 0;
        this.visible = false;
    }
    draw(texture) {
        this.clear();
        this.mask = canvas.primary.mask;
        let textureSprite = PIXI.Sprite.from(texture);
        textureSprite.filters = [this.coreShader];
        this.addChild(textureSprite);
    }
    clear() {
        this.removeChildren().forEach(c => c.destroy());
    }
    coreShader = new PIXI.Filter(undefined, CoreShaderProg, {
        uOutlineWidth: 0.00,
        uAlpha: 0.3
    });
    getAntialiasingShader(width, height) {
        return new PIXI.Filter(undefined, AntialiasingShaderProg, {
            uResolution: new Float32Array([width, height])
        });
    }
}
