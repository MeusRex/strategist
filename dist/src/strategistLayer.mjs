import { ModuleId } from "./startup.mjs";
/**
 * Empty Layer for UI tools. They need a layer, and trying to merge it with others is meh
 */
export default class StrategistLayer extends InteractionLayer {
    constructor() {
        super();
    }
    static get layerOptions() {
        return foundry.utils.mergeObject(super.layerOptions, {
            name: ModuleId,
            zIndex: 245
        });
    }
}
