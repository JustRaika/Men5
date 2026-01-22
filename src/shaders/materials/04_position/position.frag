precision mediump float;

uniform float u_time;

varying vec3 v_position;
varying vec2 v_uv;
varying vec3 v_normal;

void main() {
    vec2 p = v_uv*2.0;
    vec2 q = p - vec2(0.45, 1.2);

    // Set the surface color
    vec3 col = mix ( vec3(0.5, 0.5, 1), vec3(0.7, 0.5, 1), p.y);

    // math to create flower
    float r = 0.2 + 0.1 * cos( atan(q.y, q.x) * 10.0 + 20.0 * q.x + 1.3 );
    // draw flower
    col *= smoothstep( r, r+0.03, length( q ));

    // math to create stem
    r = 0.02;
    r += 0.0015 * cos( 100.0 * q.y);
    r += exp( -16.0 * p.y + 5.0);
    // draw stem
    col *= 1.0 - (1.0 - smoothstep( r, r+0.003, abs(q.x + 0.2 * sin( 1.8 * q.y )))) * (1.0 - smoothstep( 0.0, 0.1, q.y ));

    gl_FragColor = vec4(col, 1.0);
}