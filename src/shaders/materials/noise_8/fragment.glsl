precision mediump float;

// Common uniforms
uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;

// varyings
varying vec3 v_position;
varying vec3 v_normal;

// include chunks
#include <curl>
#include <worley>
#include <simplex>

void main() {
    const float speed = 2.0;
    const float caseCount = 5.0;
    float s = mod(floor(u_time / speed), caseCount);

    float col = 0.5; // backup

    if (s < 1.0) { // hash
        col = hash(v_position * 0.1);
    } else if (s < 2.0) { // fbm
        col = fbm(v_position * 10.0);
    } else if (s < 3.0) { // curl
        vec3 n = curl(v_position * 10.0);
        gl_FragColor = vec4(n , 1.0);
        return;
    } else if (s < 4.0) { // worley
        col = worley(v_position * 2.0);
    } else if (s < 5.0) { // simplex
        col = simplex(v_position * 2.3);
    }

    gl_FragColor = vec4(vec3(col) , 1.0);
}