import { IThing as IGameStartrThing } from "gamestartr/lib/IGameStartr";

/**
 * A Thing with traits specific to Trumpicorn.
 */
export interface IThing extends IGameStartrThing { }

/**
 * An in-game Character Thing.
 */
export interface ICharacter extends IThing {
    /**
     * Whether this is a Player.
     */
    player?: boolean;
}
