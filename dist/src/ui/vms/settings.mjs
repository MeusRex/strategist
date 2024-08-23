import DataManager from "../../dataManager.mjs";
import KoApplication from "../../koApplication.mjs";
import { DataType } from "../../enums/dataTypes.mjs";
import Terrain from "../../models/terrain.mjs";
import Kingdom from "../../models/kingdom.mjs";
export default class Settings extends KoApplication {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            id: "strategist:settings",
            classes: [strategist],
            template: this.basePath + "settings.html",
            width: 800,
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
    add(type) {
        switch (type) {
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
}
