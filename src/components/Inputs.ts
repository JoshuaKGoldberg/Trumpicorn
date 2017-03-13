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
     * Checks whether direction keys such as up may trigger for a Character.
     * 
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
     * Reacts to a Character simulating an up key press. If possible, this causes
     * walking in the up direction. The onKeyDownUp mod trigger is fired.
     * 
     * @param player   The triggering Player.
     * @param event   The original user-caused Event.
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
     * Reacts to a Character simulating a right key press. If possible, this causes
     * walking in the right direction. The onKeyDownRight mod trigger is fired.
     * 
     * @param player   The triggering Player.
     * @param event   The original user-caused Event.
     */
    public keyDownRight(player: IPlayer): void {
        if (!this.canDirectionsTrigger()) {
            return;
        }

        player.keys.right = true;
    }

    /**
     * Reacts to a Character simulating a left key press. If possible, this causes
     * walking in the left direction. The onKeyDownLeft mod trigger is fired.
     * 
     * @param player   The triggering Player.
     * @param event   The original user-caused Event.
     */
    public keyDownLeft(player: IPlayer): void {
        if (!this.canDirectionsTrigger()) {
            return;
        }

        player.keys.left = true;
    }

    /**
     * Reacts to the left key being lifted. The onKeyUpLeft mod event is fired.
     * 
     * @param player   The triggering Player.
     * @param event   The original user-caused Event.
     */
    public keyUpLeft(player: IPlayer): void {
        player.keys.left = false;
    }

    /**
     * Reacts to the right key being lifted. The onKeyUpRight mod event is fired.
     * 
     * @param player   The triggering Player.
     * @param event   The original user-caused Event.
     */
    public keyUpRight(player: IPlayer): void {
        player.keys.right = false;
    }

    /**
     * Reacts to the up key being lifted. The onKeyUpUp mod event is fired.
     * 
     * @param player   The triggering Player.
     * @param event   The original user-caused Event.
     */
    public keyUpUp(player: IPlayer): void {
        player.keys.up = false;
    }
}
