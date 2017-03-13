import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IPlayer } from "./Player";

/**
 * 
 */
export interface IInputsCallback<TGameStartr extends Trumpicorn, TInputs extends Inputs<TGameStartr>> {
    (this: TInputs, player: IPlayer): void;
}

/**
 * Input functions used by Trumpicorn instances.
 */
export class Inputs<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * Quickly tapping direction keys means to look in a direction, not walk.
     */
    public readonly inputTimeTolerance: number = 4;

    /**
     * @returns Whether direction keys may trigger.
     */
    public canDirectionsTrigger(): boolean {
        return !this.gameStarter.gamesRunner.getPaused();
    }

    /**
     * 
     */
    public receiveActionEvent(callback: IInputsCallback<TGameStartr, this>, playerIndex: number, event: Event): void {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        const player: IPlayer = this.gameStarter.players[playerIndex] || this.gameStarter.player.createAdditionalPlayer();

        callback.call(this, player, event);
    }

    /**
     * @param player   The triggering Player.
     */
    public keyDownUp(player: IPlayer): void {
        if (!this.canDirectionsTrigger()) {
            return;
        }

        player.keys.up = true;
    }

    /**
     * 
     */
    public keyDownDown(event?: Event): void {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
    }

    /**
     * @param player   The triggering Player.
     */
    public keyDownRight(player: IPlayer): void {
        if (!this.canDirectionsTrigger()) {
            return;
        }

        player.keys.right = true;
    }

    /**
     * @param player   The triggering Player.
     */
    public keyDownLeft(player: IPlayer): void {
        if (!this.canDirectionsTrigger()) {
            return;
        }

        player.keys.left = true;
    }

    /**
     * Restarts the game if there are no unfrozen Players.
     */
    public keyDownSpace(event?: Event): void {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        for (const player of this.gameStarter.players) {
            if (!player.frozen && player.alive) {
                return;
            }
        }

        this.gameStarter.groupHolder.clearArrays();
        this.gameStarter.timeHandler.cancelAllEvents();
        this.gameStarter.gameplay.gameStart();
    }

    /**
     * @param player   The triggering Player.
     */
    public keyUpLeft(player: IPlayer): void {
        player.keys.left = false;
    }

    /**
     * @param player   The triggering Player.
     */
    public keyUpRight(player: IPlayer): void {
        player.keys.right = false;
    }

    /**
     * @param player   The triggering Player.
     */
    public keyUpUp(player: IPlayer): void {
        player.keys.up = false;
    }
}
