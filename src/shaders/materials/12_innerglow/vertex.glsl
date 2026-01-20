precision mediump float;

// declare the varyings to pass data to the fragment shader
varying vec3 v_viewPosition;
varying vec3 v_normal;

void main() {
    v_normal = normalize(normalMatrix * normal);

    vec4 viewPos = modelViewMatrix * vec4(position, 1.0);
    v_viewPosition = viewPos.xyz;

    gl_Position = projectionMatrix * viewPos;
}
