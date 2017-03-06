import { IGroupsModuleSettings } from "gamestartr/lib/IGameStartr";


/**
 * @returns Group settings for a Trumpicorn instance.
 */
export function GenerateGroupsSettings(): IGroupsModuleSettings {
    "use strict";

    return {
        groupNames: ["Scenery", "Text", "Character", "Player", "Particle"],
        groupTypes: "Array"
    };
}
