import { Component } from "eightbittr/lib/Component";
import { ITimeCycle } from "timehandlr/lib/ITimeHandlr";

import { Trumpicorn } from "../Trumpicorn";
import { ICharacter } from "./Things";

/**
 * Which direction a Player is facing.
 */
export enum PlayerDirection {
    left = -1,
    top = 0,
    right = 1
}

/**
 * A Player Thing, which is normally controlled by the user.
 */
export interface IPlayer extends ICharacter {
    /**
     * Whether jump can be pressed (as opposed to it having just been).
     */
    canJump?: boolean;

    /**
     * Whether this is currently running (flying through the air).
     */
    running?: boolean;

    /**
     * The current state of user-provided input.
     */
    keys: IPlayerKeys;

    /**
     * A secondary sprite of the Player for overlapping the side of the screen.
     */
    shadow?: IPlayer;

    /**
     * TimeHandlr cycles for the Player.
     */
    cycles: {
        /**
         * Running cycle, if the Player is running.
         */
        running: ITimeCycle;

        [i: string]: ITimeCycle;
    }
}

/**
 * Status flags for user-provided input.
 */
export interface IPlayerKeys {
    /**
     * Whether the left key is currently pressed.
     */
    left?: boolean;

    /**
     * Whether the right key is currently pressed.
     */
    right?: boolean;

    /**
     * The current user-indicated direction.
     */
    direction?: PlayerDirection;

    /**
     * Whether the jump key is currently pressed.
     */
    jump?: boolean;
}



/**
 * Player functions used by Trumpicorn instances.
 */
export class Player<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    public onPlayerAdded(player: IPlayer): void {
        player.keys = {};
    }

    public boostUp(_player: IPlayer): void {
        // ...
    }

    /**
     * 
     */
    public maintain(): void {
        for (const player of this.gameStarter.groupHolder.getGroup("Player") as IPlayer[]) {
            this.maintainPlayer(player);
        }
    }

    /**
     * 
     */
    public maintainPlayer(player: IPlayer): void {
        // Horizontal slowdown
        if (Math.abs(player.xvel) > 1) {
            player.xvel *= 0.96;
        } else {
            player.xvel = 0;
            this.stopRunning(player);
        }

        // Key speed-ups
        if (player.keys.right) {
            player.xvel += 1.17;
        } else if (player.keys.left) {
            player.xvel -= 1.17;
        }

        // Gravity
        if (player.yvel < 4.9) {
            player.yvel += .35;
        }

        // Top map boundary
        if (player.yvel < 0) {
            if (player.bottom < this.gameStarter.mapScreener.top) {
                player.yvel = 0;
            } else if (player.top < this.gameStarter.mapScreener.top) {
                player.yvel *= .84;
            }
        }

        // Map sides overflow
        this.checkPlayerSidesOverflow(player);

        // Rainbow spawning
        if (player.xvel !== 0 && player.yvel !== 0) {
            this.addRainbowBehind(player);
        }

        // Collisions
        this.gameStarter.thingHitter.checkHitsForThing(player);
        if (player.shadow) {
            this.gameStarter.thingHitter.checkHitsForThing(player.shadow);
        }
    }

    private addRainbowBehind(player: IPlayer): void {

    }

    private checkPlayerSidesOverflow(player: IPlayer): void {

    }

    private stopRunning(player: IPlayer): void {

    }
}
