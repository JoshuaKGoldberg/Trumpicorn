import { Component } from "eightbittr/lib/Component";
import { ITimeCycle } from "timehandlr/lib/ITimeHandlr";

import { Trumpicorn } from "../Trumpicorn";
import { Jumping } from "./player/Jumping";
import { Maintenance } from "./player/Maintenance";
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
     * Whether jump can be pressed (as opposed to it having just been).
     */
    jumping?: boolean;

    /**
     * The current state of user-provided input.
     */
    keys: IPlayerKeys;

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
    public readonly jumping: Jumping<TGameStartr> = new Jumping(this);

    /**
     * 
     */
    public readonly maintenance: Maintenance<TGameStartr> = new Maintenance(this);

    /**
     * 
     * 
     * @todo Extend for multiplayer?
     */
    public createAndPositionPlayer(rainbow: IThing): IPlayer {
        const player: IPlayer = this.gameStarter.objectMaker.make<IPlayer>("Player");

        this.gameStarter.physics.setMidXObj(player, rainbow);
        this.gameStarter.physics.setBottom(player, rainbow.top);
        player.resting = rainbow;
        this.gameStarter.things.add(player);

        return player;
    }

    /**
     * 
     */
    public onPlayerAdded(player: IPlayer): void {
        player.keys = {};
    }

    /**
     * 
     */
    public die(player: IPlayer): void {
        player.frozen = true;

        this.gameStarter.timeHandler.addEventInterval(
            (): boolean => {
                player.opacity -= 0.02;
                this.gameStarter.physics.shiftVert(player, 0.25);

                if (player.opacity === 0) {
                    this.gameStarter.physics.killNormal(player);
                    return true;
                }

                return false;
            },
            1,
            Infinity);
    }
}
