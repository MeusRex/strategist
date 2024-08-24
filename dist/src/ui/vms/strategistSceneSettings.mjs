import DataManager from "../../dataManager.mjs";
import KoApplication from "../../koApplication.mjs";
import { DataType } from "../../enums/dataTypes.mjs";
import Terrain from "../../models/terrain.mjs";
import Kingdom from "../../models/kingdom.mjs";
export default class StrategistSceneSettings extends KoApplication {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "strategist:scenesettings",
            classes: [strategist],
            template: this.basePath + "strategistSceneSettings.html",
            width: 16 + 220 * 4 + 20 * 3, // 16 margin, 220 width of card, 20 gap -> 4 cards per row
            height: 1200,
            popOut: true,
            closeOnSubmit: true,
            title: "Strategist Scene Settings"
        });
    }
    constructor(scene) {
        super();
        this.scene = scene;
        this.register = () => strategist.settings = this;
        this.unregister = () => strategist.settings = null;
        const terrains = DataManager.load(scene, DataType.Terrain);
        const kingdoms = DataManager.load(scene, DataType.Kingdom);
        this.knockifyMany(terrains, this.terrains);
        this.knockifyMany(kingdoms, this.kingdoms);
    }
    scene;
    terrains = window.ko.observableArray();
    kingdoms = window.ko.observableArray();
    activeTab = window.ko.observable("terrain");
    save() {
        DataManager.save(this.scene, DataType.Terrain, this.deknockifyMany(this.terrains()));
        DataManager.save(this.scene, DataType.Kingdom, this.deknockifyMany(this.kingdoms()));
    }
    add() {
        switch (this.activeTab()) {
            case "terrain":
                this.terrains.push(this.knockify(new Terrain()));
                break;
            case "kingdom":
                this.kingdoms.push(this.knockify(new Kingdom()));
                break;
            default:
                break;
        }
    }
    delete(arr, data) {
        arr.remove(data);
    }
    pickIcon(object) {
        // @ts-ignore
        const filePicker = new FilePicker();
        // @ts-ignore
        filePicker.callback = (path) => {
            object.img(path);
        };
        filePicker.render(true);
    }
    // data is the knockified object
    onDrop(data, event) {
        let payload = JSON.parse(event.originalEvent.dataTransfer.getData("text/plain"));
        if (!payload.type || !payload.uuid)
            return;
        let id = payload.uuid.split('.')[1];
        switch (payload.type) {
            case "JournalEntry":
                data.journal(id);
                break;
            case "Actor":
                data.box(id);
                break;
        }
        event.preventDefault();
    }
    onDragOver(data, event) {
        // could prettify it a bit with proper drag drop indicators
        // for now, it's a stub
        event.preventDefault();
    }
}
