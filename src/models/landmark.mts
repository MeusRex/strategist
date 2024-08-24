import { FallbackImage } from "../startup.mjs";

export default class Landmark {
    public name: string = "";
    public journal: string = "";
    // 
    public img: string = FallbackImage;
    // formula to modify the tcost or add stuff to the owner
    public formula: string = "";
    // an image shown on the map
    public icon: string | undefined;
}