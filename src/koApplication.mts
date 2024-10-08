export default class KoApplication extends Application {
    override activateListeners(html: any) {
        super.activateListeners(html);
        window.ko.applyBindings(this, this._element[0]);
        this.register && this.register();
    }

    override close(options?: { force?: boolean | undefined; } | undefined): Promise<void> {
        window.ko.cleanNode(this._element[0]);
        this.unregister && this.unregister();
        return super.close(options);
    }

    localize(key: string): string {
        if (this.mlKey)
            key = this.mlKey + key;
        return game.i18n.localize(key);
    }

    refreshPosition() {
        this.setPosition({height: "auto"});
    }

    knockifyMany(origin: any[], target: ko.ObservableArray) {
      if (!origin)
        origin = [];

        origin.forEach(o => {
          target.push(this.knockify(o));
        });
      }

    knockify(obj: any) {
      return window.ko.mapping.fromJS(obj);
    }
    
    deknockifyMany(origin: any[]): any[] {
      if (!origin)
        origin = [];

        const arr: any[] = [];
        origin.forEach(o => {
          arr.push(this.deknockify(o));
        });

        return arr;
    }

    deknockify(obj: any) {
      return window.ko.mapping.toJS(obj);
    }

    deknockifyManyAndZip(origin: any[]): object {
        return this.zip(this.deknockifyMany(origin));
    }

    zip(array: any[]): { [key: string]: any} {
        return array.reduce((acc: { [x: string]: any; }, item: { id: string | number; }) => {
          acc[item.id] = { ...item }; // Use spread operator to create a new object
          return acc;
        }, {});
      }

    register: Function | null = null;
    unregister: Function | null = null; 
    mlKey: string | null = null;

    public static get basePath(): string {
      return "modules/strategist/dist/src/ui/templates/";
    }
}