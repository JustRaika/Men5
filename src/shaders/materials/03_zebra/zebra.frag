precision mediump float;

uniform float u_time;
varying vec3 v_position;

       
void main() {

    vec3 surface_color = vec3(0.5 + 0.5 * cos(20.0 * v_position.y + 3.0 * u_time));

    gl_FragColor = vec4(surface_color, 1.0);
}