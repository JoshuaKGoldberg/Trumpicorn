import { ICollisionsModuleSettings } from "gamestartr/lib/IGameStartr";

import { Trumpicorn } from "../Trumpicorn";

/**
 * @param trumpicorn   A generating Trumpicorn instance.
 * @returns Object settings for the Trumpicorn instance.
 */
export function GenerateCollisionsSettings(trump: Trumpicorn): ICollisionsModuleSettings {
    "use strict";

    return {
        groupNames: ["Player"],
        keyGroupName: "groupType",
        keyTypeName: "title",
        globalCheckGenerators: {
            Player: trump.collisions.generateCanThingCollide.bind(trump.collisions),
        },
        hitCheckGenerators: {
            Player: {
                Character: trump.collisions.generateIsPlayerTouchingCharacter.bind(trump.collisions)
            }
        },
        hitCallbackGenerators: {
            Player: {
                Character: trump.collisions.generateHitPlayerCharacter.bind(trump.collisions)
            }
        }
    };
}
