import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IPlayer } from "./Player";
import { IThing } from "./Things";

/**
 * Collision functions used by Trumpicorn instances.
 */
export class Collisions<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    public generateCanThingCollide = () => () => true;

    /**
     * Function generator for the generic isCharacterTouchingCharacter checker.
     * 
     * @returns A Function that generates isCharacterTouchingCharacter. 
     */
    public generateIsPlayerTouchingCharacter(): (player: IPlayer, character: IThing) => boolean {
        /**
         * Generic checker for whether two characters are touching each other.
         * This checks to see if either has the nocollide flag, or if they're
         * overlapping, respecting tolerances.
         * 
         * @param thing
         * @param other
         * @returns Whether thing is touching other.
         */
        return (player: IPlayer, character: IThing): boolean => (
            player.right >= (character.left)
            && player.left <= (character.right)
            && player.bottom >= (character.top)
            && player.top <= (character.bottom));
    }

    /**
     * 
     */
    public generateHitPlayerCharacter(): (player: IPlayer, character: IThing) => boolean {
        return (_thing: IPlayer, other: IThing): boolean => {
            this.gameStarter.physics.killNormal(other);

            return true;
        };
    }
}
