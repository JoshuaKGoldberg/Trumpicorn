import { IRunnerModuleSettings } from "gamestartr/lib/IGameStartr";

import { Trumpicorn } from "../Trumpicorn";

/**
 * @param trumpicorn   A generating Trumpicorn instance.
 * @returns Runner settings for the Trumpicorn instance.
 */
export function GenerateRunnerSettings(trumpicorn: Trumpicorn): IRunnerModuleSettings {
    "use strict";

    return {
        interval: 1000 / 60,
        adjustFramerate: true,
        games: [
            (): void => {
                trumpicorn.maintenance.maintainMoving("Scenery");
                trumpicorn.maintenance.maintainMoving("Character");
                trumpicorn.maintenance.maintainMoving("Solid");
                trumpicorn.maintenance.maintainMoving("Player");
                trumpicorn.maintenance.maintainMoving("Particle");
            },
            (): void => {
                trumpicorn.player.maintain();
            },
            (): void => {
                trumpicorn.timeHandler.handleEvents();
            },
            (): void => {
                trumpicorn.pixelDrawer.refillGlobalCanvas();
            }
        ]
    };
}
