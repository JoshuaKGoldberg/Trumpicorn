import { IInputModuleSettings } from "gamestartr/lib/IGameStartr";

import { Trumpicorn } from "../Trumpicorn";

/**
 * @param trumpicorn   A generating Trumpicorn instance.
 * @returns Input settings for the Trumpicorn instance.
 */
export function GenerateInputSettings(trumpicorn: Trumpicorn): IInputModuleSettings {
    "use strict";

    return {
        aliases: {
            // Keyboard aliases
            left:   [65, 37],     // a,     left
            right:  [68, 39],     // d,     right
            up:     [87, 38]      // w,     up
        },
        triggers: {
            onkeydown: {
                left: trumpicorn.inputs.keyDownLeft.bind(trumpicorn.inputs),
                right: trumpicorn.inputs.keyDownRight.bind(trumpicorn.inputs),
                up: trumpicorn.inputs.keyDownUp.bind(trumpicorn.inputs)
            },
            onkeyup: {
                left: trumpicorn.inputs.keyUpLeft.bind(trumpicorn.inputs),
                right: trumpicorn.inputs.keyUpRight.bind(trumpicorn.inputs),
                up: trumpicorn.inputs.keyUpUp.bind(trumpicorn.inputs)
            },
            oncontextmenu: {},
            onmousedown: {}
        }
    };
}
