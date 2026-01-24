precision mediump float;

varying vec3 v_color;
uniform float u_sceneFade;

void main() {
    
    vec2 coord = gl_PointCoord - 0.5;
    float dist = length(coord);
    if (dist > 0.5) discard;

    gl_FragColor = vec4(v_color, 1.0);
    
    gl_FragColor.rgb *= u_sceneFade;
}