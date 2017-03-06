import { IMapsModuleSettings } from "gamestartr/lib/IGameStartr";

/**
 * @returns Map settings for a Trumpicorn instance.
 */
export function GenerateMapsSettings(): IMapsModuleSettings {
    "use strict";

    return {
        mapDefault: "America",
        locationDefault: "Freedom",
        groupTypes: ["Scenery", "Text", "Character", "Player", "Particle"],
        library: {
            America: {
                name: "America",
                locationDefault: "Freedom",
                locations: {
                    Freedom: {
                        area: "Earth"
                    }
                },
                areas: {
                    Earth: {
                        creation: []
                    }
                }
            }
        }
    };
}
