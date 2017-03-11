import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";

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
     * Reacts to a Character simulating an up key press. If possible, this causes
     * walking in the up direction. The onKeyDownUp mod trigger is fired.
     * 
     * @param this.gameStarter.players[0]   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyDownUp(_: void, event?: Event): void {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        if (!this.canDirectionsTrigger()) {
            return;
        }

        this.gameStarter.players[0].keys.up = true;
    }

    /**
     * Reacts to a Character simulating a right key press. If possible, this causes
     * walking in the right direction. The onKeyDownRight mod trigger is fired.
     * 
     * @param this.gameStarter.players[0]   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyDownRight(_: void, event?: Event): void {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        if (!this.canDirectionsTrigger()) {
            return;
        }

        this.gameStarter.players[0].keys.right = true;
    }

    /**
     * Reacts to a Character simulating a left key press. If possible, this causes
     * walking in the left direction. The onKeyDownLeft mod trigger is fired.
     * 
     * @param this.gameStarter.players[0]   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyDownLeft(_: void, event?: Event): void {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        if (!this.canDirectionsTrigger()) {
            return;
        }

        if (this.gameStarter.players[0].player) {
            this.gameStarter.players[0].keys.left = true;
        }
    }

    /**
     * Reacts to the left key being lifted. The onKeyUpLeft mod event is fired.
     * 
     * @param this.gameStarter.players[0]   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpLeft(_: void, event?: Event): void {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        this.gameStarter.players[0].keys.left = false;
    }

    /**
     * Reacts to the right key being lifted. The onKeyUpRight mod event is fired.
     * 
     * @param this.gameStarter.players[0]   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpRight(_: void, event?: Event): void {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        this.gameStarter.players[0].keys.right = false;
    }

    /**
     * Reacts to the up key being lifted. The onKeyUpUp mod event is fired.
     * 
     * @param this.gameStarter.players[0]   The triggering Character.
     * @param event   The original user-caused Event.
     */
    public keyUpUp(_: void, event?: Event): void {
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        this.gameStarter.players[0].keys.up = false;
    }
}
