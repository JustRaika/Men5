precision mediump float;

// varyings
varying vec3 v_normal;
uniform float u_sceneFade;

void main() {
    gl_FragColor = vec4(v_normal * 0.5 + 0.5, 1.0);
    
    gl_FragColor.rgb *= u_sceneFade;
}