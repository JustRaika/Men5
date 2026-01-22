precision mediump float;

uniform float u_time;
uniform float u_pointSize;

varying vec3 v_color;

void main() {
    vec3 pos = position;

    // kleine Wellen im Y-Bereich
    pos.y += sin(u_time + pos.x * 3.0) * 0.1;

    // Farbe als Funktion der Position
    v_color = vec3(abs(sin(u_time + pos.x)), abs(sin(u_time + pos.y)), abs(sin(u_time + pos.z)));

    gl_PointSize = u_pointSize;
    pos += vec3(sin(u_time) * 0.3, cos(u_time) * 0.3, sin(u_time * 0.5) * 0.1);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}