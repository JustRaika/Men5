precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;
attribute vec3 position;

void main() {
  // position, modelViewMatrix, projectionMatrix sind bereits verfügbar
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
