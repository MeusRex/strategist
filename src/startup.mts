import Core from "./core.mjs";
import StrategistLayer from "./strategistLayer.mjs";
import DataManager from "./dataManager.mjs";

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
Hooks.on("getSceneControlButtons", (ui: any) => strategist.core.setupUI(ui));
Hooks.on("updateScene", (document: any, change: any) => strategist.core.update(document, change)); 