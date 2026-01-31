//  Intro State + Render

import { smoothstep } from '../utils.js';
import { showInteractionHint } from './introUI.js';

export function createIntroController({
    intro,
    renderer,
    sharedUniforms,
    clock,
    duration = 11
}) {
    let state = 'idle';
    let startTime = 0;

    function start() {
        startTime = clock.getElapsedTime();
        state = 'intro';
    }

    function render(canvas) {
        if (state !== 'intro') return false;

        const elapsed = clock.getElapsedTime();
        const t = (elapsed - startTime) / duration;

        intro.material.uniforms.u_time.value = elapsed;
        intro.material.uniforms.u_resolution.value.set(
            canvas.clientWidth,
            canvas.clientHeight
        );

        intro.material.uniforms.u_fade.value =
            1.0 - smoothstep(0.7, 1.0, t);

        sharedUniforms.u_sceneFade.value =
            smoothstep(0.2, 0.8, t);

        renderer.render(intro.scene, intro.camera);

        if (t >= 1.0) {
            state = 'scene';
            sharedUniforms.u_sceneFade.value = 1.0;
            showInteractionHint();
        }

        return true;
    }

    function isSceneActive() {
        return state === 'scene';
    }

    return { start, render, isSceneActive };
}
