import { IItemsModuleSettings } from "gamestartr/lib/IGameStartr";

/**
 * @param _fsp   A generating Trumpicorn instance.
 * @returns Item settings for the Trumpicorn instance.
 */
export function GenerateItemsSettings(): IItemsModuleSettings {
    "use strict";

    return {
        prefix: "Trumpicorn::",
        values: {
            score: {
                minimum: 0,
                valueDefault: 0
            }
        }
    };
}
