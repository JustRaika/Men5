precision mediump float;

// declare the varyings to pass data to the fragment shader
uniform float u_time;
//uniform vec2 u_resolution;
uniform float u_pointSize;

varying vec3 v_color;

void main() {
    vec3 pos = position;

    // kleine Wellen im Y-Bereich
    pos.y += sin(u_time + pos.x * 3.0) * 0.1;

    // Farbe als Funktion der Position
    v_color = vec3(abs(sin(u_time + pos.x)), abs(sin(u_time + pos.y)), abs(sin(u_time + pos.z)));

    gl_PointSize = u_pointSize;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}