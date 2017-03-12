import { IEventsModuleSettings } from "gamestartr/lib/IGameStartr";

/**
 * @returns Event settings for a Trumpicorn instance.
 */
export function GenerateEventsSettings(): IEventsModuleSettings {
    "use strict";

    return {
        keyCycleCheckValidity: "alive",
        timingDefault: 9
    };
}
