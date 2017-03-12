import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "./Things";

/**
 * Maintenance functions used by Trumpicorn instances.
 */
export class Maintenance<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    public maintainMoving(groupName: string): void {
        const things: IThing[] = this.gameStarter.groupHolder.getGroup(groupName) as IThing[];
        this.gameStarter.quadsKeeper.determineAllQuadrants(groupName, things);

        for (const thing of things) {
            if (thing.frozen) {
                continue;
            }

            if (thing.movement) {
                thing.movement(thing);
            }

            this.gameStarter.physics.shiftHoriz(thing, thing.xvel || 0);
            this.gameStarter.physics.shiftVert(thing, thing.yvel || 0);
        }
    }
}
