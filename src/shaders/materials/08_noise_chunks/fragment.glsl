precision mediump float;

uniform float u_time;

varying vec3 v_position;

#include <noisebase>
#include <simplex3D>
#include <perlin4D>
#include <worley3D>
#include <curl>

void main() {
    const float speed = 3.0; // shader visible in seconds
    const float caseCount = 5.0;
    float s = mod(floor(u_time / speed), caseCount);

    float col = snoise(v_position * 2.0); // simplex 3D as backup
    col = 0.5 + 0.5 * col;

    if (s < 1.0) { // simplex 3D
        // use backup -> simplex 3D
    } else if (s < 2.0) { // perlin 4D
        col = cnoise(vec4(v_position * 4.0, 1.0 * u_time));
        col = 0.5 + 0.5 * col;
    } else if (s < 3.0) { // Worley 3D
        col = cellular(v_position * 3.0).x;
    } else if (s < 4.0) { // worley 3D -> borders
        vec2 c = cellular(v_position * 3.0);
        col = c.y - c.x;
    } else if (s < 5.0) { // curl
        vec3 curl = curlNoise(v_position * 1.0 + 0.1 * u_time);
        curl = 0.5 + 0.5 * curl;
        gl_FragColor = vec4(vec3(curl) , 1.0);
        return;
    }

    gl_FragColor = vec4(vec3(col) , 1.0);
}