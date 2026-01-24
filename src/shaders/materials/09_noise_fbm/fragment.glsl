precision mediump float;

uniform float u_time;
uniform float u_sceneFade;

varying vec3 v_position;

// include chunks
#include <noisebase>
#include <simplex3D>
#include <fbm>

void main() {
    float scale = 1.0;

    vec3 p = normalize(v_position);
    float theta = atan(p.y, p.x);
    float phi = acos(p.z);

    vec3 sp = vec3(cos(theta) * sin(phi),
                   sin(theta) * sin(phi),
                   cos(phi)) * scale;

    float n = fbm(sp, 5, 2.0, 0.4, vec2(0.0, 0.0));

    gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
    
    gl_FragColor.rgb *= u_sceneFade;
}