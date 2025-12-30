precision mediump float;

// declare the varyings to pass data to the fragment shader
varying vec3 v_position;
varying vec3 v_normal;
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_pointSize;

varying vec3 v_color;

void main() {
    // Partikel bewegen
    vec3 pos = position;

    // z.B. kleine Wellen im Y-Bereich
    pos.y += sin(u_time + pos.x * 5.0) * 0.2;

    // Farbe als Funktion der Position
    v_color = vec3(abs(sin(u_time + pos.x)), abs(sin(u_time + pos.y)), abs(sin(u_time + pos.z)));

    // Set point size
    gl_PointSize = u_pointSize;

    // Standard Transformation
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}