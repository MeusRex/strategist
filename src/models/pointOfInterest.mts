import Landmark from "./landmark.mjs";

// cells that have a special feature, like a town, mine, river, valuable resources and so on
export default class PointOfInterest {
    constructor(p: Point) {
        this.cell = p;
    }
    public cell: Point;

    public landmarks: Landmark[] = [];
}