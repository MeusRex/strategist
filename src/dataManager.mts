import { DataType } from "./enums/dataTypes.mjs";
import Kingdom from "./models/kingdom.mjs";
import PointOfInterest from "./models/pointOfInterest.mjs";
import Terrain from "./models/terrain.mjs";
import { ModuleId } from "./startup.mjs";

export default abstract class DataManager {
    public static load<T>(scene: Scene, key: DataType): T[] {
        return scene.getFlag(ModuleId, key) as T[];
    }

    public static save<T>(scene: Scene, key: string, data: T[]): void {
        scene.setFlag(ModuleId, key, data);
    }

    private static enabled: string = "enabled";
    public static isEnabled(scene: Scene): boolean {
        return Boolean(scene.getFlag(ModuleId, this.enabled));
    }

    public static enable(scene: Scene) {
        scene.setFlag(ModuleId, this.enabled, true);

        this.save(scene, DataType.Kingdom, new Array<Kingdom>);
        this.save(scene, DataType.Terrain, new Array<Terrain>);
        this.save(scene, DataType.PointOfInterest, new Array<PointOfInterest>);
    }

    // whipes any traces of strategist on the scene
    public static clear(scene: Scene) {
        scene.unsetFlag(ModuleId, this.enabled);
        Object.values(DataType).forEach(key => scene.unsetFlag(ModuleId, key));
    }
}