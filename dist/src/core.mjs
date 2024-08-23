import TextureBuilder from "./textureBuilder.mjs";
import TextureLayer from "./textureLayer.mjs";
export default class Core {
    textureLayer = new TextureLayer();
    onCanvasReady() {
        let textureBuilder = new TextureBuilder();
        let texture = textureBuilder.buildTexture(canvas.dimensions, 0);
        canvas.stage.rendered.environment.effects.addChildAt(this.textureLayer, 1);
        this.textureLayer.draw(texture);
    }
    onCanvasTearDown() {
    }
    onCanvasInit() {
    }
}
