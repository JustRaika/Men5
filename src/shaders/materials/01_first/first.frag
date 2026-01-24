precision mediump float;

uniform float u_sceneFade;

void main() {
  gl_FragColor = vec4(0.4, 0.08, 0.72, 1.0);
  gl_FragColor.rgb *= u_sceneFade;
}
