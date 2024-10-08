import * as PIXI from "pixi.js";
import StrategistSceneSettings from "./ui/vms/strategistSceneSettings.mts";
import Core from "./core.mts";

declare global {
    declare const canvas: any;

    declare const game: {
        settings: {
            set(moduleId: string, key: string, object: object);
            get(moduleId: string, key: string): object;
            register(moduleId: string, key: string, data: object)
        };
        scenes: any;
        user: {
            isGM: boolean;
        };
        i18n: {
            localize(key: string): string;
        }
    };

    interface Dictionary<T> {
        get(key: string): T;
        set(key: string, val: T);
        all(): T[];
    }
    
    declare const socketlib: any;
    
    declare const strategist: {
        core: Core;
        settings: StrategistSceneSettings | null;
    }
    
    declare const CONFIG: any;
}




declare const PIXI: typeof import("pixi.js");

declare namespace PIXI {
    export import Container = PIXI.Container;
    export import RenderTexture = PIXI.RenderTexture;
    export import Sprite = PIXI.Sprite;
    export import Graphics = PIXI.Graphics;
    export import ColorSource = PIXI.ColorSource;
    // Add more exports as needed
}