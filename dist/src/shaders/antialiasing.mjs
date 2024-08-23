export const AntialiasingShader = `
precision mediump float;
uniform sampler2D uSampler;
uniform vec2 uResolution;

void main() {
    vec2 pixelSize = vec2(1.0, 1.0) / uResolution;
    vec4 centerColor = texture2D(uSampler, gl_FragCoord.xy / uResolution);

    // Sample surrounding pixels for antialiasing
    vec4 leftColor = texture2D(uSampler, gl_FragCoord.xy / uResolution - vec2(pixelSize.x, 0.0));
    vec4 rightColor = texture2D(uSampler, gl_FragCoord.xy / uResolution + vec2(pixelSize.x, 0.0));
    vec4 topColor = texture2D(uSampler, gl_FragCoord.xy / uResolution + vec2(0.0, pixelSize.y));
    vec4 bottomColor = texture2D(uSampler, gl_FragCoord.xy / uResolution - vec2(0.0, pixelSize.y));

    // Calculate the average color of surrounding pixels
    vec4 avgColor = (centerColor + leftColor + rightColor + topColor + bottomColor) / 5.0;

    // Output the averaged color
    gl_FragColor = avgColor;
}`;
