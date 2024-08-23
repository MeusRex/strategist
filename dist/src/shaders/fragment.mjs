const FragmentShader = `
  precision mediump float;
  varying vec2 vTextureCoord;
  uniform sampler2D uSampler;
  uniform vec2 uTextureSize;
  uniform float uOutlineWidth;

  void main(void) {
    vec2 texelSize = 1.0 / uTextureSize;
    vec4 current = texture2D(uSampler, vTextureCoord);
    float alpha = 0.0;

    for (int i = -3; i < 3; i++) {
        for (int j = -3; j < 3; j++) {
            float d = length(vec2(j, i));
            alpha = max(alpha, texture2D(uSampler, vTextureCoord + vec2(j, i) * texelSize).a * smoothstep(0.0, 1.0, (3.0 - d) / 3.0));
            // alpha = 0.5;
        }
    }

    gl_FragColor = vec4(current.rgb, alpha);
  }`;
export {};
