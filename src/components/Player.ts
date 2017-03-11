import { Component } from "eightbittr/lib/Component";
import { ITimeCycle } from "timehandlr/lib/ITimeHandlr";

import { Trumpicorn } from "../Trumpicorn";
import { ICharacter, IThing } from "./Things";

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
     * The current state of user-provided input.
     */
    keys: IPlayerKeys;

    /**
     * TimeHandlr cycles for the Player.
     */
    cycles: {
        /**
         * Running cycle, if the Player is running.
         */
        running: ITimeCycle;

        [i: string]: ITimeCycle;
    };

    /**
     * A Solid this is resting on, if any.
     */
    resting?: IThing;

    /**
     * Whether this is currently running (flying through the air).
     */
    running?: boolean;
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
     * Whether the up key is currently pressed.
     */
    up?: boolean;

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
        this.gameStarter.thingHitter.checkHitsForThing(player);

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

        // Resting, gravity
        if (player.resting) {
            this.gameStarter.physics.setBottom(player, player.resting.top);
        } else if (player.yvel < 4.9) {
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

        // Horizontal boundaries
        if (player.left < 0) {
            this.gameStarter.physics.setLeft(player, 0);
            player.xvel = 0;
        } else if (player.right > this.gameStarter.mapScreener.right) {
            this.gameStarter.physics.setRight(player, this.gameStarter.mapScreener.right);
            player.xvel = 0;
        }

        // Rainbow spawning
        if (player.xvel !== 0 && player.yvel !== 0) {
            this.addRainbowBehind(player);
        }

        // Collisions
        this.gameStarter.thingHitter.checkHitsForThing(player);
    }

    /**
     * 
     */
    private addRainbowBehind(_player: IPlayer): void {
        // ...
    }

    /**
     * 
     */
    private stopRunning(_player: IPlayer): void {
        // ...
    }
}
