export default class KoApplication extends Application {
    activateListeners(html) {
        super.activateListeners(html);
        window.ko.applyBindings(this, this._element[0]);
        this.register && this.register();
    }
    close(options) {
        window.ko.cleanNode(this._element[0]);
        this.unregister && this.unregister();
        return super.close(options);
    }
    localize(key) {
        if (this.mlKey)
            key = this.mlKey + key;
        return game.i18n.localize(key);
    }
    refreshPosition() {
        this.setPosition({ height: "auto" });
    }
    knockify(origin, target) {
        if (!origin)
            origin = [];
        origin.forEach(o => {
            target.push(window.ko.mapping.fromJS(o));
        });
    }
    deknockify(origin) {
        if (!origin)
            origin = [];
        const arr = [];
        origin.forEach(o => {
            arr.push(window.ko.mapping.toJS(o));
        });
        return arr;
    }
    deknockifyAndZip(origin) {
        return this.zip(this.deknockify(origin));
    }
    zip(array) {
        return array.reduce((acc, item) => {
            acc[item.id] = { ...item }; // Use spread operator to create a new object
            return acc;
        }, {});
    }
    register = null;
    unregister = null;
    mlKey = null;
    static get basePath() {
        return "modules/strategist/dist/src/ui/templates/";
    }
}
