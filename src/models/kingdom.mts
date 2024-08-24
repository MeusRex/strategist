import { FallbackImage } from "../startup.mjs";

export default class Kingdom {
    // cells claimed by this kingdom
    public cells: Point[] = [];
    // display name of the kingdom
    public name: string = foundry.utils.randomID();
    // the id of a journal entry linked to this kingdom
    public journal: string = "";
    // color on the map
    public color: string = "0xff0000";
    // image of the kingdom
    public img: string = FallbackImage;
    // id of an entity with inventory. Used as a storage for resources and stuff
    public box: string = "";
}