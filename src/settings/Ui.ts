import { IModuleSettingsObject } from "gamestartr/lib/IGameStartr";
import * as iuserwrappr from "userwrappr/lib/IUserWrappr";
import * as iuserwrapprschemas from "userwrappr/lib/UISchemas";

/**
 * Settings regarding the UI, particularly for an IUserWrappr.
 */
export interface IUserWrapprSettings extends IModuleSettingsObject {
    /**
     * Schemas for each UI control to be made.
     */
    schemas?: iuserwrapprschemas.ISchema[];

    /**
     * Allowed sizes for the game.
     */
    sizes?: iuserwrappr.ISizeSummaries;

    /**
     * The default starting size.
     */
    sizeDefault: string;
}

/**
 * @returns UI settings for a Trumpicorn instance.
 */
export function GenerateUISettings(): IUserWrapprSettings {
    "use strict";

    return {
        globalName: "trumpicorn",
        sizeDefault: "Large",
        sizes: {
            Large: {
                width: 800,
                height: Infinity
            }
        },
        schemas: []
    };
}
