import { ICollisionsModuleSettings } from "gamestartr/lib/IGameStartr";

import { Trumpicorn } from "../Trumpicorn";

/**
 * @param trumpicorn   A generating Trumpicorn instance.
 * @returns Object settings for the Trumpicorn instance.
 */
export function GenerateCollisionsSettings(trumpicorn: Trumpicorn): ICollisionsModuleSettings {
    "use strict";

    return {
        groupNames: ["Player", "Solid"],
        keyGroupName: "groupType",
        keyTypeName: "title",
        globalCheckGenerators: {
            Character: trumpicorn.collisions.generateCanThingCollide.bind(trumpicorn.collisions),
            Player: trumpicorn.collisions.generateCanThingCollide.bind(trumpicorn.collisions),
            Solid: trumpicorn.collisions.generateCanThingCollide.bind(trumpicorn.collisions)
        },
        hitCheckGenerators: {
            Player: {
                Character: trumpicorn.collisions.generateIsPlayerTouchingCharacter.bind(trumpicorn.collisions),
                Solid: trumpicorn.collisions.generateIsPlayerTouchingSolid.bind(trumpicorn.collisions)
            }
        },
        hitCallbackGenerators: {
            Player: {
                Character: trumpicorn.collisions.generateHitPlayerCharacter.bind(trumpicorn.collisions),
                Solid: trumpicorn.collisions.generateHitPlayerSolid.bind(trumpicorn.collisions)
            }
        }
    };
}
