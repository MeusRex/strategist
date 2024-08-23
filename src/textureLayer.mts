import { AntialiasingShader as AntialiasingShaderProg } from "./shaders/antialiasing.mjs";
import { CoreShader as CoreShaderProg } from "./shaders/core.mjs";

export default class TextureLayer extends PIXI.Container {
    constructor() {
        super();
        this.zIndex = 0;
        this.visible = false;
    }

    public draw(texture: PIXI.RenderTexture) {
        this.clear();
        this.mask = canvas.primary.mask;
        let textureSprite = PIXI.Sprite.from(texture);

        textureSprite.filters = [this.coreShader];

        this.addChild(textureSprite);
    }

    public clear() {
        this.removeChildren().forEach(c => c.destroy());
    }

    private coreShader: PIXI.Filter = new PIXI.Filter(undefined, CoreShaderProg, {
        uOutlineWidth: 0.00,
        uAlpha: 0.3
    });

    private getAntialiasingShader(width: number, height: number): PIXI.Filter {
        return new PIXI.Filter(undefined, AntialiasingShaderProg, {
            uResolution: new Float32Array([width, height])
        });
    }
}