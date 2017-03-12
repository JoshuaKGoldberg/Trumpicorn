import { IObjectsModuleSettings } from "gamestartr/lib/IGameStartr";

import { Trumpicorn } from "../Trumpicorn";

/**
 * @param trumpicorn   A generating Trumpicorn instance.
 * @returns Object settings for the Trumpicorn instance.
 */
export function GenerateObjectsSettings(trumpicorn: Trumpicorn): IObjectsModuleSettings {
    "use strict";

    return {
        onMake: "onMake",
        doPropertiesFull: true,
        giveFunctionsNames: true,
        inheritance: {
            Quadrant: {},
            Map: {},
            Area: {},
            Location: {},
            Thing: {
                Character: {
                    Player: {},
                    Trump: {}
                },
                Particle: {},
                Scenery: {
                   Star: {}
                },
                Solid: {
                   Rainbow: {}
                },
                Text: {}
            }
        },
        properties: {
            Quadrant: {
                tolx: 0,
                toly: 0
            },
            Map: {
                initialized: false
            },
            Area: {
                background: "black",
            },
            Thing: {
                // Sizing
                width: 32,
                height: 32,
                // Placement
                alive: true,
                placed: false,
                maxquads: 16,
                // Sprites
                sprite: "",
                spriteType: "neither",
                scale: 1,
                offsetX: 0,
                offsetY: 0,
                opacity: 1,
                // Movement
                xvel: 0,
                yvel: 0,
                // Collisions
                tolTop: 0,
                tolRight: 0,
                tolBottom: 0,
                tolLeft: 0,
                // Triggered Functions
                onMake: trumpicorn.things.process.bind(trumpicorn.things)
            },
            Character: {
                groupType: "Character"
            },
            Trump: {
                width: 88,
                height: 88,
                speed: 1.17,
                movement: trumpicorn.trump.movement.bind(trumpicorn.trump),
                onCollide: trumpicorn.trump.onCollide.bind(trumpicorn.trump)
            },
            Player: {
                groupType: "Player",
                jumping: false,
                width: 44,
                height: 33,
                player: true,
                onThingAdded: trumpicorn.player.onPlayerAdded.bind(trumpicorn.player)
            },
            Particle: {
                width: 8,
                height: 8,
                groupType: "Particle"
            },
            Scenery: {
                groupType: "Scenery",
                width: 1,
                height: 6
            },
            Star: {
                width: 8,
                height: 8,
                movement: trumpicorn.stars.movement.bind(trumpicorn.stars),
                onThingAdded: trumpicorn.stars.onStarAdded.bind(trumpicorn.stars)
            },
            Solid: {
                groupType: "Solid",
                width: 16,
                height: 32,
                repeat: true
            },
            Rainbow: {
                movement: trumpicorn.rainbows.movement.bind(trumpicorn.rainbows)
            },
            Text: {
                groupType: "Text"
            }
        }
    };
}
