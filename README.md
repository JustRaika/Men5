# The Shader Planetarium <!-- omit from toc -->
A mentoring project in collaboration to get to know the realm of shaders in computer graphics. 

# Contributors <!-- omit from toc -->
- [Jan Schwegler](https://github.com/JanSchwegler)
- [Dominika Degtyareva](https://github.com/JustRaika)

# Table of Contents <!-- omit from toc -->
- [1. Tech Setup](#1-tech-setup)
- [2. How to install and run](#2-how-to-install-and-run)
- [3. Shader Basics](#3-shader-basics)
  - [3.1. Parallel Instancing](#31-parallel-instancing)
  - [3.2. Vertex, Fragment \& Uniforms — How They Work Together](#32-vertex-fragment--uniforms--how-they-work-together)
  - [3.3. Worth Mentioning](#33-worth-mentioning)
    - [3.3.1. Coordinate Spaces \& Transformations](#331-coordinate-spaces--transformations)
    - [3.3.2. Interpolation](#332-interpolation)
    - [3.3.3. Precision Qualifiers](#333-precision-qualifiers)
    - [3.3.4. Data Types \& Vectors](#334-data-types--vectors)
    - [3.3.5. Branching \& Performance](#335-branching--performance)
    - [3.3.6. Time \& Animation](#336-time--animation)
    - [3.3.7. Determinism \& Statelessness](#337-determinism--statelessness)
- [4. Shader Preset (for THREE.ShaderMaterial)](#4-shader-preset-for-threeshadermaterial)
- [5. Shader Knowlege aquired](#5-shader-knowlege-aquired)
- [6. Snippets](#6-snippets)
  - [6.1. Noises](#61-noises)
    - [6.1.1. Worley 3D](#611-worley-3d)
    - [6.1.2. Perlin 3D](#612-perlin-3d)
    - [6.1.3. Perlin 4D](#613-perlin-4d)
    - [6.1.4. Simplex 3D](#614-simplex-3d)
    - [6.1.5. Simplex 3D Gradient](#615-simplex-3d-gradient)
    - [6.1.6. Simplex 4D](#616-simplex-4d)
    - [6.1.7. Fractal Brownian motion](#617-fractal-brownian-motion)
  - [6.2. Map UV to -1,1](#62-map-uv-to--11)
  - [6.3. Map from -1,1 to 0,1](#63-map-from--11-to-01)
  - [6.4. Custom smoothstep function of f](#64-custom-smoothstep-function-of-f)
- [7. Diffrent methods for complex shaders](#7-diffrent-methods-for-complex-shaders)
- [8. Resources](#8-resources)
  - [8.1. Three.js](#81-threejs)
  - [8.2. Shader](#82-shader)

# 1. Tech Setup
- Three.js
- Vite
- GLSL
- HTML/CSS/JS
- Node.js
- (WebGL)

# 2. How to install and run
1. Clone the repository
   ```bash
   git clone https://github.com/JustRaika/Men5.git
   ```
   -> Alternatively, you can download the ZIP file from the GitHub repository and extract it to your desired location or do it via `Github Desktop`.

2. Navigate to the project directory
    ```bash
    cd Men5
    ```

3. Install dependencies
     ```bash
        npm install
     ```
    -> This project requires Node (v20 or higher) and npm (bundled with Node.js). If you don't have Node, please download and install it from https://nodejs.org/.

4. Start the development server
     ```bash
        npm run dev
    ``` 

5. Open your browser and go to `http://localhost:5173/Men5/dist/` (or the URL provided in the terminal). Ensure the port is available.


# 3. Shader Basics
All technical research is recorded on our [Miro!](https://miro.com/app/board/uXjVJGpaUj0=/?share_link_id=286442062973)

Read [The Book of Shaders!](https://thebookofshaders.com/)

A shader is a small program that runs on the GPU and controls how graphics are rendered. In GLSL, the two main types are **vertex shaders** and **fragment shaders**. The vertex shader processes the position and attributes of each vertex in 3D space, while the fragment shader calculates the final color of each pixel on the screen. It's important to note: the vertex shader can **modify the positions of existing vertices** but cannot create new vertices.

Shaders are used because they are highly efficient for parallel calculations. They run directly on the GPU, which is optimized for processing many vertices and pixels simultaneously. This makes shaders much faster than performing the same operations sequentially on the CPU.

## 3.1. Parallel Instancing

In GLSL, shader code is written as if it processes **one vertex** or **one fragment** at a time. When a draw call is executed, the GPU runs many instances of the same shader in parallel, one for each vertex or fragment. These instances are independent and **cannot communicate or share memory** with each other.

![How the GPU runs a call in parallel](https://thebookofshaders.com/01/04.jpeg)  
[&copy; https://thebookofshaders.com](https://thebookofshaders.com)

Because of this strict parallelism, data flow is tightly controlled. The vertex shader can output values that are passed to the fragment shader through **varying variables** (called as `out` in the vertex shader and `in` in the fragment shader). These values are different for each vertex and are automatically **interpolated across fragments**. They are called *varyings* because their values vary per vertex and per fragment, unlike **uniforms**, which remain constant for all shader executions.

## 3.2. Vertex, Fragment & Uniforms — How They Work Together

Vertex and fragment shaders are connected in a **rendering pipeline**. The **vertex shader** runs first and processes each vertex individually. It can pass data (called `varyings`) to the **fragment shader**, which then runs for every pixel created from those vertices. This allows information like positions, normals, or texture coordinates to flow from vertices to fragments.

**Uniforms** are custom global variables shared by both vertex and fragment shaders. They are set from the CPU (for example via JavaScript) and remain constant during a draw call. Uniforms are used to inject external data such as time, resolution, colors, or transformation matrices into the shaders.

**Attributes** are per-vertex input data provided to the vertex shader. Common attributes include `position`, `normal`, and `uv` coordinates. Each vertex receives its own set of attribute values, meaning attributes can differ from vertex to vertex. **Attributes only exist in the vertex shader, not in the fragment shader.**


```
CPU / JavaScript
▼
Uniforms & Attributes
▼
Vertex Shader
▼
Fragment Shader
▼
Pixels
```

## 3.3. Worth Mentioning

### 3.3.1. Coordinate Spaces & Transformations
In computer graphics, a vertex passes through several coordinate spaces before it appears on the screen. It starts in model space, where the geometry is defined relative to its own origin. In world space, the object is positioned within the scene. View space represents the scene from the camera’s point of view, and finally clip space is used to determine what is visible on screen. In Three.js, the vertex shader usually multiplies the vertex position by the built-in matrices: 

```glsl
gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
```

### 3.3.2. Interpolation
- Varyings are interpolated automatically between vertices
- Interpolation is linear in screen space
- This explains smooth color gradients, lighting, and textures

### 3.3.3. Precision Qualifiers
- GLSL supports `lowp`, `mediump`, and `highp`
- Important for performance, especially on mobile GPUs
- Fragment shaders often need explicit precision declarations

### 3.3.4. Data Types & Vectors
- Common types: `float`, `vec2`, `vec3`, `vec4`, `mat4`
- Vector operations are built-in and optimized
- Shaders are written in a math-oriented style

### 3.3.5. Branching & Performance
- The vertex count is a bottleneck because it needs to be processed in series on the CPU first
- `if` statements exist but can be expensive
- GPUs prefer branchless code
- Math-based conditions are often faster than logic

### 3.3.6. Time & Animation
- Shaders themselves have no concept of time
- Time must be passed in via a uniform
- Used for animations, noise, and procedural effects

### 3.3.7. Determinism & Statelessness
- Shaders are stateless
- No memory between frames
- Every frame is computed from scratch using inputs

# 4. Shader Preset (for THREE.ShaderMaterial)

Vertex Shader
```glsl
precision mediump float;

// declare the varyings to pass data to the fragment shader
varying vec3 v_position;
varying vec3 v_normal;

void main() {
    // Save the varyings
    v_position = position;
    v_normal = normalize(normalMatrix * normal);

    // Vertex shader output
    gl_Position = projectionMatrix * modelViewMatrix * vec4(v_position, 1.0);
}
```

Fragment Shader
```glsl
precision mediump float;

// Common uniforms
// uniform float u_time;
// uniform vec2 u_scroll;
// uniform vec2 u_resolution;

// varyings
varying vec3 v_position;
varying vec3 v_normal;

// include chunks
// #include <noisebase>
// #include <simplex3D>
// #include <perlin3D>
// #include <worley3D>
// #include <fbm>
// #include <curl>

void main() {
    gl_FragColor = vec4(v_normal * 0.5 + 0.5, 1.0);
}
```

Create Shader Material
```javascript
new THREE.ShaderMaterial({
    name: 'Preset',
    uniforms: { 
        ...sharedUniforms, // include uniforms
        // Custom uniforms
    },
    vertexShader: vertexShader, // link Vertex Shader
    fragmentShader: fragmentShader // link Fragment Shader
});
```

# 5. Shader Knowlege aquired
- Shader languages: GLSL
- Shader types: Vertex, Fragment, Compute
- Shader platforms: WebGL
- Shader editors: Shadertoy
- Uniforms
- Setup and Include
- Varyings

# 6. Snippets

## 6.1. Noises
For most of the 3D Noises, the position can me added to the time with a scalar. (4D Noises are ment to take the time in the 4th dimension):
```glsl
vec3 p = v_position * 2.0 + 0.3 * u_time;
```
Some noises need to be normalized from -1,1 to 0,1. This is also shown in: "Map from -1,1 to 0,1"
```glsl
0.5 + 0.5 * n

// example
vec3 n = noise(v_position); // n: -1,1
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0); // 0,1
```
### 6.1.1. Worley 3D
Most common: use F1 as grayscale 
```glsl
float n = cellular(v_position * 3.0).x;
gl_FragColor = vec4(vec3(n), 1.0);
```
Use cell borders (F2 − F1)
```glsl
vec2 c = cellular(v_position * 3.0);
float edge = c.y - c.x;
gl_FragColor = vec4(vec3(edge), 1.0);
```

### 6.1.2. Perlin 3D
```glsl
float n = cnoise(v_position * 2.0);
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### 6.1.3. Perlin 4D
```glsl
float n = cnoise(vec4(v_position * 2.0, 0.3 * u_time));
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### 6.1.4. Simplex 3D
```glsl
float n = snoise(v_position * 2.0);
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### 6.1.5. Simplex 3D Gradient
Same as "Simplex 3D", but it returns additional information in "grad". Grad is a vector 3 that contains spatial derivative. That means the rate of change of a function with respect to spatial coordinates, so direction & strength. 
```glsl
vec3 grad;
float n = snoise(v_position * 3.0, grad);
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### 6.1.6. Simplex 4D
```glsl
float n = snoise(vec4(v_position * 2.0, 0.3 * u_time));
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```

### 6.1.7. Fractal Brownian motion
Fractal Brownian motion (fBm) takes a noise and adds octaves to it. That means multiple layers of the noise multiplied. With every octave, the base noise function is called again. With the "step", an offset can be added to each layer (diffrent in each layer).
```glsl
vec3 pos = vec3(v_position.xy, 0.3 * u_time);
float n = fbm(pos, 5, 2.0, 0.4, vec2(0.0, 0.0));
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```
This works on flat surfaces but not on spheres. For spheres, its best to map to spherical coordinates:
```glsl
float scale = 1.0;

vec3 p = normalize(v_position);
float theta = atan(p.y, p.x);
float phi = acos(p.z);

vec3 sp = vec3(cos(theta) * sin(phi),
                sin(theta) * sin(phi),
                cos(phi)) * scale;

float n = fbm(sp, 5, 2.0, 0.4, vec2(0.0, 0.0));

gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0);
```
(After the scale, motion can be added. For example: scale + 0.3 * u_time)

## 6.2. Map UV to -1,1
```glsl
vec2 p = v_uv * 2.0;
vec2 q = p - vec2(0.5, 0.5);

// modify vec2 to move element
vec2 q = p - vec2(0.3, 0.6);
```

## 6.3. Map from -1,1 to 0,1
```glsl
0.5 + 0.5 * n

// example
vec3 n = noise(v_position); // n: -1,1
gl_FragColor = vec4(vec3(0.5 + 0.5 * n), 1.0); // 0,1
```
## 6.4. Custom smoothstep function of f
```glsl
float u = f * f * ( 3.0 - 2.0 * f );
float u = smoothstep( 0.0, 1.0, f );
```

# 7. Diffrent methods for complex shaders
| Name | Method | Performance | Look | Pros / Cons | Notes |
|------|---------------|------------|------|-------------|-------|
| **Raymarched Volumetric** | Use a bounding mesh (sphere, cube, capsule) and compute the object procedurally per fragment using raymarching. Procedural noise, turbulence, and color are calculated in the fragment shader. | Medium–Heavy | ★★★★★ | Pros: Fully 3D volumetric, dynamic, controllable. Cons: Shader complexity, GPU heavy. | Mesh is only a container; standard for procedural volumes; good for fully dynamic effects. |
| **Textured / Layered Mesh** | One or more meshes with ShaderMaterial using vertex displacement and procedural color/noise. Multiple overlapping layers can simulate depth and parallax. | High | ★★★★ | Pros: Lightweight, easy camera rotation, fakes volumetric depth. Cons: Limited internal volume; more layers = higher GPU cost. | Layering multiple meshes adds perceived volume; use additive blending and slight scale offsets for depth. |
| **Particle System** | Represent the object as many small moving particles or points with color, size, and opacity. Procedural noise can drive motion or flicker. Additive blending is often used. | High | ★★★★ | Pros: Fast, scalable, easy sparks/trails. Cons: Hard to achieve smooth volumetric look, may appear “blobby”. | Works well combined with a base mesh to give depth. |

# 8. Resources
## 8.1. Three.js
- [https://threejs.org/]
- [https://janschwegler.github.io/di-men3-three.js/dokumentation/dokumentation] - Three.js Basics

## 8.2. Shader
- [https://thebookofshaders.com/] - An excellent resource for learning about shaders from the ground up.
- [https://www.shadertoy.com/]
- [https://aerotwist.com/tutorials/an-introduction-to-shaders-part-2/]
- [https://webgl-shaders.com/index.html]
- [https://www.geeks3d.com/shader-library/] - A large collection of shaders
- [https://github.com/vanrez-nez/awesome-glsl?tab=readme-ov-file] - A curated list of awesome GLSL libraries, resources and shiny things.
- [https://github.com/stegu/webgl-noise] / [https://stegu.github.io/webgl-noise/webdemo/] - Noise Chunks for WebGL
- [https://iquilezles.org/articles/] - Everything and really really advanced Math
- [https://catlikecoding.com/unity/tutorials/] - Unity Tutorials
- [https://blog.42yeah.is/] - Shader, Math and Algorithms


# 8. ToDo <!-- omit from toc -->
- [x] Slay the shaders
- [x] Turn off mobile support
- [x] Make spheres clickable to show info about the shader
- [ ] Background stop when on about page
- [ ] Page Load Animation
- [ ] Add sounds (ambient music + interaction sounds)
- [ ] Make particel field smaller