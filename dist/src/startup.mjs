import Core from "./core.mjs";
import StrategistLayer from "./strategistLayer.mjs";
export const ModuleId = "strategist";
export const FallbackImage = "icons/sundries/flags/banner-flag-pirate.webp";
Hooks.once("init", () => {
    //@ts-ignore
    globalThis.strategist = game.modules.get(ModuleId);
});
Hooks.once("setup", () => {
    if (!CONFIG.Canvas.layers.strategist) {
        CONFIG.Canvas.layers.strategist = { layerClass: StrategistLayer, group: "interface" };
    }
    strategist.core = new Core();
});
Hooks.on("canvasReady", () => strategist.core.onCanvasReady());
Hooks.on("canvasTearDown", () => strategist.core.onCanvasTearDown());
Hooks.on("canvasInit", () => strategist.core.onCanvasInit());
Hooks.on("getSceneControlButtons", (ui) => strategist.core.setupUI(ui));
Hooks.on("updateScene", (document, change) => strategist.core.update(document, change));
