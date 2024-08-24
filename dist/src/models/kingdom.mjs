import { FallbackImage } from "../startup.mjs";
export default class Kingdom {
    // cells claimed by this kingdom
    cells = [];
    // display name of the kingdom
    name = foundry.utils.randomID();
    // the id of a journal entry linked to this kingdom
    journal = "";
    // color on the map
    color = "0xff0000";
    // image of the kingdom
    img = FallbackImage;
    // id of an entity with inventory. Used as a storage for resources and stuff
    box = "";
}
