export default class TextureBuilder {
    constructor() {
    }
    buildTexture(dimensions, gridType) {
        const container = new PIXI.Container();
        // the size property is the diametre, but we need radius
        let innerRadius = dimensions.size / 2;
        let redHex = this.createHexagonTemplate(innerRadius, 0xff0000, "laying");
        let greenHex = this.createHexagonTemplate(innerRadius, 0x00ff00, "laying");
        let blueHex = this.createHexagonTemplate(innerRadius, 0x0000ff, "laying");
        let rowStep = this.getOuterRadius(innerRadius) * 1.5;
        for (let row = 0; row < dimensions.rows; row++) {
            for (let col = 0; col < dimensions.columns; col++) {
                const r = Math.random();
                let tex = r <= 0.33 ? redHex : r <= 0.66 ? greenHex : blueHex;
                const hexSprite = PIXI.Sprite.from(tex);
                hexSprite.position.x = (col + row * 0.5 - col / 2) * (innerRadius * 2);
                hexSprite.position.y = row * rowStep;
                container.addChild(hexSprite);
            }
        }
        return canvas.app.renderer.generateTexture(container);
    }
    createHexagonTemplate(innerRadius, color, orientation) {
        const outerRadius = this.getOuterRadius(innerRadius);
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1);
        graphics.moveTo(0, outerRadius);
        graphics.lineTo(innerRadius, 0.5 * outerRadius);
        graphics.lineTo(innerRadius, -0.5 * outerRadius);
        graphics.lineTo(0, -outerRadius);
        graphics.lineTo(-innerRadius, -0.5 * outerRadius);
        graphics.lineTo(-innerRadius, 0.5 * outerRadius);
        graphics.lineTo(0, outerRadius);
        graphics.endFill();
        return canvas.app.renderer.generateTexture(graphics);
    }
    getOuterRadius(innerRadius) {
        return innerRadius / 0.866025404;
    }
}
