import Core from "./core.mjs";

const ModuleId = "strategist";

Hooks.once("init", () => {
    //@ts-ignore
    globalThis.strategist = game.modules.get(ModuleId);
});

Hooks.once("setup", () => {
    strategist.core = new Core();
});

Hooks.on("canvasReady", () => strategist.core.onCanvasReady());
Hooks.on("canvasTearDown", () => strategist.core.onCanvasTearDown());
Hooks.on("canvasInit", () => strategist.core.onCanvasInit());