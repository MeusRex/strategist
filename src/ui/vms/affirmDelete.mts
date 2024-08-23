import { ModuleId } from "../../startup.mjs";
import DataManager from "../../dataManager.mjs";
import KoApplication from "../../koApplication.mjs";

export default class AffirmDelete extends KoApplication {
    constructor(scene: Scene) {
        super();
        this.scene = scene;
    }

    scene: Scene;

    static override get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "strategist:AffirmDelete",
            classes: [ModuleId],
            template: KoApplication.basePath + "affirmDelete.html",
            width: 240,
            height: "auto",
            popOut: true,
            closeOnSubmit: true, 
            title: "Delete Strategist Scene Data?"
        });
    }

    delete() {
        DataManager.clear(this.scene);
        super.close(undefined);
    }

    cancel() {
        super.close(undefined);
    }
}