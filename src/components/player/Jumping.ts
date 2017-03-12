import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../../Trumpicorn";
import { IPlayer } from "../Player";

/**
 * Player jumping functions.
 */
export class Jumping<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    private static readonly pointsDefault: number = 25;
    /**
     * 
     */
    public jump(thing: IPlayer): void {
        let label: string = "JUMP";
        let points: number = Jumping.pointsDefault;

        if (thing.resting) {
            this.gameStarter.physics.shiftVert(thing, -Math.abs(thing.resting.yvel));
        }

        thing.yvel = -3.5;
        if (thing.resting && (thing.xvel > 0) === (thing.resting.xvel > 0)) {
            thing.xvel *= Math.abs(thing.resting.xvel);
            thing.yvel -= Math.abs(thing.xvel) / 2;

            label = "BOOST";
            points += Math.floor(Math.abs(thing.xvel) * Math.abs(thing.yvel));
        }

        thing.jumping = true;
        thing.resting = undefined;

        this.gameStarter.scoring.score({ label, points, thing });
        this.gameStarter.physics.shiftVert(thing, thing.yvel);
        this.gameStarter.timeHandler.addEvent(
            (): void => {
               thing.jumping = false;
            },
            35);
    }
}
