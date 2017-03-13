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
                    Powerup: {},
                    Projectile: {},
                    Trump: {}
                },
                Particle: {
                    Sparkle: {},
                    Text: {
                       TextA: {},
                       TextB: {},
                       TextC: {},
                       TextD: {},
                       TextE: {},
                       TextF: {},
                       TextG: {},
                       TextH: {},
                       TextI: {},
                       TextJ: {},
                       TextK: {},
                       TextL: {},
                       TextM: {},
                       TextN: {},
                       TextO: {},
                       TextP: {},
                       TextQ: {},
                       TextR: {},
                       TextS: {},
                       TextT: {},
                       TextU: {},
                       TextV: {},
                       TextW: {},
                       TextX: {},
                       TextY: {},
                       TextZ: {},
                       Text0: {},
                       Text1: {},
                       Text2: {},
                       Text3: {},
                       Text4: {},
                       Text5: {},
                       Text6: {},
                       Text7: {},
                       Text8: {},
                       Text9: {},
                       TextApostrophe: {},
                       TextExclamationMark: {},
                       TextSpace: {}
                   }
                },
                Scenery: {
                    Star: {}
                },
                Solid: {
                   Rainbow: {}
                }
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
            Powerup: {
                width: 42,
                height: 35,
                movement: trumpicorn.powerups.movement.bind(trumpicorn.powerups),
                onCollide: trumpicorn.powerups.onCollide.bind(trumpicorn.powerups)
            },
            Projectile: {
                width: 28,
                height: 28,
                speed: 3.5,
                onCollide: trumpicorn.trump.projectiles.onCollide.bind(trumpicorn.trump.projectiles)
            },
            Trump: {
                width: 88,
                height: 88,
                disabledByPowerups: 0,
                speed: 1.17,
                movement: trumpicorn.trump.movement.bind(trumpicorn.trump),
                onCollide: trumpicorn.trump.onCollide.bind(trumpicorn.trump)
            },
            Player: {
                groupType: "Player",
                jumping: false,
                width: 88,
                height: 66,
                player: true,
                onThingAdded: trumpicorn.player.onPlayerAdded.bind(trumpicorn.player)
            },
            Particle: {
                groupType: "Particle"
            },
            Sparkle: {
                width: 5,
                height: 5,
                movement: trumpicorn.particles.movement.bind(trumpicorn.particles)
            },
            Text: {
                width: 8,
                height: 8
            },
            Scenery: {
                groupType: "Scenery",
                width: 1,
                height: 6
            },
            Star: {
                width: 7,
                height: 7,
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
            }
        }
    };
}
