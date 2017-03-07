import { ICollisionsModuleSettings } from "gamestartr/lib/IGameStartr";

import { Trumpicorn } from "../Trumpicorn";

/**
 * @param trumpicorn   A generating Trumpicorn instance.
 * @returns Object settings for the Trumpicorn instance.
 */
export function GenerateCollisionsSettings(trumpicorn: Trumpicorn): ICollisionsModuleSettings {
    "use strict";

    return {
        groupNames: ["Player"],
        keyGroupName: "groupType",
        keyTypeName: "title",
        globalCheckGenerators: {
            Player: trumpicorn.collisions.generateCanThingCollide.bind(trumpicorn.collisions),
        },
        hitCheckGenerators: {
            Player: {
                Character: trumpicorn.collisions.generateIsPlayerTouchingCharacter.bind(trumpicorn.collisions)
            }
        },
        hitCallbackGenerators: {
            Player: {
                Character: trumpicorn.collisions.generateHitPlayerCharacter.bind(trumpicorn.collisions)
            }
        }
    };
}
