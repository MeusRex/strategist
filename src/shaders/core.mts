const Core = `precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform float uOutlineWidth;
uniform float uAlpha;

void main(void) {
    vec4 textureColor = texture2D(uSampler, vTextureCoord);

    // Sample neighboring pixels
    vec4 leftTopColor = texture2D(uSampler, vTextureCoord + vec2(-uOutlineWidth, -uOutlineWidth));
    vec4 leftBottomColor = texture2D(uSampler, vTextureCoord + vec2(-uOutlineWidth, uOutlineWidth));
    vec4 leftColor = texture2D(uSampler, vTextureCoord + vec2(-uOutlineWidth, 0.0));
    vec4 rightColor = texture2D(uSampler, vTextureCoord + vec2(uOutlineWidth, 0.0));
    vec4 rightTopColor = texture2D(uSampler, vTextureCoord + vec2(uOutlineWidth, -uOutlineWidth));
    vec4 rightBottomColor = texture2D(uSampler, vTextureCoord + vec2(uOutlineWidth, uOutlineWidth));
    vec4 topColor = texture2D(uSampler, vTextureCoord + vec2(0.0, -uOutlineWidth));
    vec4 bottomColor = texture2D(uSampler, vTextureCoord + vec2(0.0, uOutlineWidth));

    // Check for color change (red to blue)
    bool isColorChange = any(notEqual(textureColor.rgb, leftColor.rgb)) ||
                         any(notEqual(textureColor.rgb, leftTopColor.rgb)) ||
                         any(notEqual(textureColor.rgb, leftBottomColor.rgb)) ||
                         any(notEqual(textureColor.rgb, rightTopColor.rgb)) ||
                         any(notEqual(textureColor.rgb, rightBottomColor.rgb)) ||
                         any(notEqual(textureColor.rgb, rightColor.rgb)) ||
                         any(notEqual(textureColor.rgb, topColor.rgb)) ||
                         any(notEqual(textureColor.rgb, bottomColor.rgb));

    if (textureColor[3] == 0.0) {
        // ignore stuff with we can't see
        gl_FragColor = textureColor;
    }
    else {
        gl_FragColor = isColorChange ? textureColor : vec4(textureColor.rgb, uAlpha);
    }
}`;