# The Shader Planetarium
A mentoring project in collaboration to get to know the realm of shaders in computer graphics. 

# Contributors
- [Jan Schwegler](https://github.com/JanSchwegler)
- [Dominika Degtyareva](https://github.com/JustRaika)

# Table of Contents
- [1. Tech Setup](#1-tech-setup)
- [2. How to install and run](#2-how-to-install-and-run)
- [3. Shader Basics](#3-shader-basics)
- [4. Shader Knowlege aquired](#4-shader-knowlege-aquired)
- [5. Resources](#5-resources)
  - [5.1. Three.js](#51-threejs)
  - [5.2. Shader](#52-shader)
- [6. ToDo](#6-todo)

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
All project setup research is recorded on our [Miro!](https://miro.com/app/board/uXjVJGpaUj0=/?share_link_id=286442062973)

The technical research for  the shaders can be found is our [Wiki.](https://github.com/JustRaika/Men5/wiki)

# 4. Shader Knowlege aquired
- Shader languages: GLSL
- Shader types: Vertex, Fragment, Compute
- Shader platforms: WebGL
- Shader editors: Shadertoy
- Uniforms
- Setup and Include
- Varyings

# 5. Resources
## 5.1. Three.js
- [https://threejs.org/] - Official 3js Website has good documentation too.
- [https://janschwegler.github.io/di-men3-three.js/dokumentation/dokumentation] - Three.js Basics of Jan's previous mentoring project

## 5.2. Shader
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


# 6. ToDo
- [x] Slay the shaders
- [x] Turn off mobile support
- [x] Make spheres clickable to show info about the shader
- [ ] Background stop when on about page
- [ ] Page Load Animation
- [ ] Add sounds (ambient music + interaction sounds)
- [ ] Make particle field smaller