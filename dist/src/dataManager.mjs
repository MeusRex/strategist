import { DataType } from "./enums/dataTypes.mjs";
import { ModuleId } from "./startup.mjs";
export default class DataManager {
    static load(scene, key) {
        return scene.getFlag(ModuleId, key);
    }
    static save(scene, key, data) {
        scene.setFlag(ModuleId, key, data);
    }
    static enabled = "enabled";
    static isEnabled(scene) {
        return Boolean(scene.getFlag(ModuleId, this.enabled));
    }
    static enable(scene) {
        scene.setFlag(ModuleId, this.enabled, true);
        this.save(scene, DataType.Kingdom, new Array);
        this.save(scene, DataType.Terrain, new Array);
        this.save(scene, DataType.PointOfInterest, new Array);
    }
    // whipes any traces of strategist on the scene
    static clear(scene) {
        scene.unsetFlag(ModuleId, this.enabled);
        Object.values(DataType).forEach(key => scene.unsetFlag(ModuleId, key));
    }
}
