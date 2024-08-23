export default class Terrain {
    // x/y of cells that belong to this terrain
    public cells: Point[] = [];
    // display name of the terrain
    public name: string = foundry.utils.randomID();
    // travel cost. The value is meaningless without the speed of the party.
    // If the party speed is set to 100, then a party can move 100 tcost per day.
    // So, a road might have a T cost of 10, a marsh 50 and a mountain 100
    public tcost: number = 0;
    // color of the map tile
    public color: string = "0x00ff00";
    // file path for the image shown in the UI
    public img: string = "";
}