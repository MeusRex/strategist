import { PrimaryOccludableObjectMixin } from "./primary-occludable-object.ts";
/**
 * A basic PCO sprite mesh which is handling occlusion and depth.
 * @param [options] The constructor options.
 * @param [options.texture]     Texture passed to the SpriteMesh.
 * @param [options.shaderClass] The shader class used to render this sprite.
 * @param [options.name]        The name of this sprite.
 * @param [options.object]      Any object that owns this sprite.
 */
/* eslint-disable no-unused-expressions */
export class PrimarySpriteMesh extends PrimaryOccludableObjectMixin(SpriteMesh) {
    constructor(options, shaderClass) {
        options;
        shaderClass;
        super(options.texture, shaderClass);
    }
    /* -------------------------------------------- */
    /*  PIXI Events                                 */
    /* -------------------------------------------- */
    _onTextureUpdate() { }
    /* -------------------------------------------- */
    /*  Helper Methods                              */
    /* -------------------------------------------- */
    setShaderClass(shaderClass) {
        shaderClass;
    }
    /* -------------------------------------------- */
    /**
     * An all-in-one helper method: Resizing the PCO according to desired dimensions and options.
     * This helper computes the width and height based on the following factors:
     *
     * - The ratio of texture width and base width.
     * - The ratio of texture height and base height.
     *
     * Additionally, It takes into account the desired fit options:
     *
     * - (default) "fill" computes the exact width and height ratio.
     * - "cover" takes the maximum ratio of width and height and applies it to both.
     * - "contain" takes the minimum ratio of width and height and applies it to both.
     * - "width" applies the width ratio to both width and height.
     * - "height" applies the height ratio to both width and height.
     *
     * You can also apply optional scaleX and scaleY options to both width and height. The scale is applied after fitting.
     *
     * **Important**: By using this helper, you don't need to set the height, width, and scale properties of the DisplayObject.
     *
     * **Note**: This is a helper method. Alternatively, you could assign properties as you would with a PIXI DisplayObject.
     *
     * @param baseWidth             The base width used for computations.
     * @param baseHeight            The base height used for computations.
     * @param [options]             The options.
     * @param [options.fit="fill"]  The fit type.
     * @param [options.scaleX=1]    The scale on X axis.
     * @param [options.scaleY=1]    The scale on Y axis.
     */
    resize(baseWidth, baseHeight, options) {
        baseWidth;
        baseHeight;
        options;
    }
    /* -------------------------------------------- */
    /*  Methods                                     */
    /* -------------------------------------------- */
    _updateBatchData() { }
    _calculateCanvasBounds() { }
    /**
     * Is the given point in canvas space contained in this object?
     * @param point                   The point in canvas space
     * @param [textureAlphaThreshold] The minimum texture alpha required for containment
     */
    containsCanvasPoint(point, textureAlphaThreshold) {
        point;
        textureAlphaThreshold;
        return true;
    }
    /**
     * Is the given point in world space contained in this object?
     * @param point                   The point in world space
     * @param [textureAlphaThreshold] The minimum texture alpha required for containment
     */
    containsPoint(point, textureAlphaThreshold) {
        point;
        textureAlphaThreshold;
        return true;
    }
    /* -------------------------------------------- */
    /*  Rendering Methods                           */
    /* -------------------------------------------- */
    renderDepthData(renderer) {
        renderer;
    }
    /* -------------------------------------------- */
    /**
     * Render the sprite with ERASE blending.
     * Note: The sprite must not have visible/renderable children.
     * @param renderer The renderer
     * @internal
     */
    _renderVoid(renderer) {
        renderer;
    }
}
