import { IThing as IGameStartrThing } from "gamestartr/lib/IGameStartr";

import { IPlayer } from "./Player";

/**
 * A Thing with traits specific to Trumpicorn.
 */
export interface IThing extends IGameStartrThing {
    /**
     * Whether to skip movement and collision checks.
     */
    frozen?: boolean;
}

/**
 * An in-game Character Thing.
 */
export interface ICharacter extends IThing {
    /**
     * 
     */
    onCollide: (player: IPlayer, character: ICharacter) => boolean;

    /**
     * Whether this is a Player.
     */
    player?: boolean;
}
