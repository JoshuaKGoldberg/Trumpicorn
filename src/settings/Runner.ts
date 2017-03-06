import { IRunnerModuleSettings } from "gamestartr/lib/IGameStartr";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "../components/Things";

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
                trumpicorn.maintenance.maintainMoving(
                    trumpicorn.groupHolder.getGroup("Scenery") as IThing[]);
                trumpicorn.maintenance.maintainMoving(
                    trumpicorn.groupHolder.getGroup("Character") as IThing[]);
                trumpicorn.maintenance.maintainMoving(
                    trumpicorn.groupHolder.getGroup("Player") as IThing[]);
                trumpicorn.maintenance.maintainMoving(
                    trumpicorn.groupHolder.getGroup("Particle") as IThing[]);
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
