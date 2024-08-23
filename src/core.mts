import { title } from "process";
import { ModuleId } from "./startup.mjs";
import TextureBuilder from "./textureBuilder.mjs";
import TextureLayer from "./textureLayer.mjs";
import DataManager from "./dataManager.mjs";
import AffirmDelete from "./ui/vms/affirmDelete.mjs";

export default class Core {
    private textureLayer: TextureLayer = new TextureLayer();

    get currentScene(): Scene {
        return canvas.scene;
    }

    setupUI(ui) {
        const tools = {
            name: "strategistTools",
            title: "Strategist",
            icon: "fa-solid fa-hexagon-image",
            layer: ModuleId,
            tools: [
                {
                    name: "enableStrategist",
                    title: "Enable Strategist",
                    icon: "fa-solid fa-chart-area",
                    toggle: true,
                    active: false,
                    onClick: async () => this.enable()
                },
                {
                    name: "toggleOverlay",
                    title: "Toggle Overlay",
                    icon: "fa-solid fa-cog",
                    toggle: true,
                    onClick: async () => this.toggleOverlay()
                }
            ]
        }

        ui.push(tools);
    }

    // enables strategist for the current scene
    public async enable() {
        if (this.strategistEnabled) {
            new AffirmDelete(this.currentScene).render(true);
        }
        else {
            // last step after setup. Other parts will listen to this
            DataManager.enable(this.currentScene);
            this.onCanvasReady();
        }
    }

    get strategistEnabled() {
        return DataManager.isEnabled(this.currentScene);
    }

    private _uiVisible = false;
    // public state indicator
    public get uiVisible() {
        return this._uiVisible;
    }
    // hides or shows the overlay: TextureLayer and CellInfo window
    public async toggleOverlay() {
        this._uiVisible = !this._uiVisible;
        this.textureLayerParent.children[Core.textureLayerIndex].visible = this._uiVisible;
        // also hide or show the form
    }

    // it is important to attach the texturelayer in the right place. If done right, it will be below the fog of war and grid, but above the background texture.
    // that way we have solved a multitude of issues in one fell swoop
    get textureLayerParent(): any {
        return canvas.stage.rendered.environment.effects;
    }
    
    static textureLayerIndex = 1;
    onCanvasReady() {
        if (this.strategistEnabled) {
            let texture = TextureBuilder.buildTexture(canvas.dimensions, 0, {});
            this.textureLayerParent.addChildAt(this.textureLayer, Core.textureLayerIndex);
            this.textureLayer.draw(texture);
        }

    }

    onCanvasTearDown() {
        this.textureLayerParent.removeChild(this.textureLayer);
        this.textureLayer.clear(); // currently we don't cache the image, but we probably should. However, we might not do that on the layer
    }

    onCanvasInit() {

    }

    /**
     * -= marks removed properties
     * added or changed properties are simply "PROPERTY_NAME"
     */
    public update(document: Scene, change: any) {
        if (change.flags.strategist) {
            // a change we care about
            let strat = change.flags.strategist;

            if (strat["-=enabled"]) {
                // strategist was turned off for the scene
                return;
            }

            if (strat["enabled"]) {
                // strategist was turned on for the scene
                return;
            }
        }
    }
}