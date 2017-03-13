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
            left: [37],
            right: [39],
            up: [38],
            down: [40],
            a: [65],
            d: [68],
            w: [87],
            space: [32],
        },
        triggers: {
            onkeydown: {
                left: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyDownLeft, 0),
                right: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyDownRight, 0),
                up: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyDownUp, 0),
                down: trumpicorn.inputs.keyDownDown.bind(trumpicorn.inputs),
                a: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyDownLeft, 1),
                d: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyDownRight, 1),
                w: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyDownUp, 1),
                space: trumpicorn.inputs.keyDownSpace.bind(trumpicorn.inputs)
            },
            onkeyup: {
                left: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyUpLeft, 0),
                right: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyUpRight, 0),
                up: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyUpUp, 0),
                a: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyUpLeft, 1),
                d: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyUpRight, 1),
                w: trumpicorn.inputs.receiveActionEvent.bind(trumpicorn.inputs, trumpicorn.inputs.keyUpUp, 1)
            },
            oncontextmenu: {},
            onmousedown: {}
        }
    };
}
