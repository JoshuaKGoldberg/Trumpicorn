import { IQuadrantsModuleSettings } from "gamestartr/lib/IGameStartr";

/**
 * @returns Quadrant settings for a Trumpicorn instance.
 */
export function GenerateQuadrantsSettings(): IQuadrantsModuleSettings {
    "use strict";

    return {
        numRows: 5,
        numCols: 6,
        tolerance: 2,
        groupNames: ["Scenery", "Solid", "Text", "Character", "Player", "Particle"],
        keyGroupName: "groupType"
    };
}
