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
    public jump(player: IPlayer): void {
        if (player.resting) {
            this.gameStarter.physics.shiftVert(player, -Math.abs(player.resting.yvel));
        }

        player.yvel = -3.5;
        if (player.resting) {
            player.xvel *= 2;
            player.yvel -= Math.abs(player.xvel) / 2;
        }

        player.jumping = true;
        player.resting = undefined;

        this.gameStarter.physics.shiftVert(player, player.yvel);
        this.gameStarter.timeHandler.addEvent(
            (): void => {
               player.jumping = false;
            },
            35);
    }
}
