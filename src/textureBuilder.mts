export default abstract class TextureBuilder {
    public static DefaultColor = "0x000000";

    /**
     * 
     * @param dimensions The dimensions of the scene this texture is created for. Note that it is the width of the grid and not the playing field.
     * @param gridType 
     * @param data The builder only care about colours. Therefore we provide an object with this format: property x_y_ where _ are the coordinates. So the top left hex would be x0y0.
     * If a coordinate property does not exist the default colour is used
     */
    public static buildTexture(dimensions: SceneDimensions, gridType: number, data: Object): PIXI.RenderTexture {
        const container = new PIXI.Container();
        
        // the size property is the diametre, but we need radius
        let innerRadius = dimensions.size / 2;
        let rowStep = this.getOuterRadius(innerRadius) * 1.5
        let templateRecord = {};

        for (let y = 0; y < dimensions.rows; y++) {
            for (let x = 0; x < dimensions.columns; x++) {
                let key = "x" + x + "y" + y;
                let color = data[key] ?? this.DefaultColor;

                let template: PIXI.RenderTexture = templateRecord[color] || (templateRecord[color] = this.createHexagonTemplate(innerRadius, color, "laying"));
                let hexSprite = PIXI.Sprite.from(template);
                let indent = y % 2 === 0 ? 0 : innerRadius;

                hexSprite.position.x = x * dimensions.size + indent;
                hexSprite.position.y = y * rowStep;

                container.addChild(hexSprite);
            }
        }

        return canvas.app.renderer.generateTexture(container);
    }
    
    private static createHexagonTemplate(innerRadius: number, color: PIXI.ColorSource, orientation: "laying" | "standing"): PIXI.RenderTexture {
        const outerRadius = this.getOuterRadius(innerRadius);
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color, 1)
        graphics.moveTo(0, outerRadius);
        graphics.lineTo(innerRadius, 0.5 * outerRadius);
        graphics.lineTo(innerRadius, -0.5 * outerRadius);
        graphics.lineTo(0, -outerRadius);
        graphics.lineTo(-innerRadius, -0.5 * outerRadius);
        graphics.lineTo(-innerRadius, 0.5 * outerRadius);
        graphics.lineTo(0, outerRadius);

        graphics.endFill();
        return canvas.app.renderer.generateTexture(graphics, {resolution: 2});
    }

    /**
     * sqrt(3) / 2
     * The relationship between inner radius (sides) and outer radius (vertices) of a hexagon
     */
    private static magicRation = 0.866025404;

    private static getOuterRadius(innerRadius: number): number {
        return innerRadius / this.magicRation;
    } 

    private static getInnerRadius(outerRadius: number): number {
        return outerRadius * this.magicRation;
    }
}
