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
    knockifyMany(origin, target) {
        if (!origin)
            origin = [];
        origin.forEach(o => {
            target.push(this.knockify(o));
        });
    }
    knockify(obj) {
        return window.ko.mapping.fromJS(obj);
    }
    deknockifyMany(origin) {
        if (!origin)
            origin = [];
        const arr = [];
        origin.forEach(o => {
            arr.push(this.deknockify(o));
        });
        return arr;
    }
    deknockify(obj) {
        return window.ko.mapping.toJS(obj);
    }
    deknockifyManyAndZip(origin) {
        return this.zip(this.deknockifyMany(origin));
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
