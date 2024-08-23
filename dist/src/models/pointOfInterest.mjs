// cells that have a special feature, like a town, mine, river, valuable resources and so on
export default class PointOfInterest {
    constructor(p) {
        this.cell = p;
    }
    cell;
    landmarks = [];
}
