import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IPlayer } from "./Player";
import { ICharacter, IThing } from "./Things";

/**
 * Collision functions used by Trumpicorn instances.
 */
export class Collisions<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * Function generator for the generic canThingCollide checker.
     * 
     * @returns A Function that generates canThingCollide.
     */
    public generateCanThingCollide = () => (thing: IThing): boolean => !thing.frozen;

    /**
     * Function generator for the generic isCharacterTouchingCharacter checker.
     * 
     * @returns A Function that generates isCharacterTouchingCharacter.
     */
    public generateIsPlayerTouchingCharacter(): (player: IPlayer, character: ICharacter) => boolean {
        /**
         * Generic checker for whether a player is touching a character.
         * 
         * @param player
         * @param character
         * @returns Whether player is touching character.
         */
        return (player: IPlayer, character: ICharacter): boolean => (
            player.right >= character.left
            && player.left <= character.right
            && player.bottom >= character.top
            && player.top <= character.bottom);
    }

    /**
     * Function generator for the generic isCharacterTouchingSolid checker.
     * 
     * @returns A Function that generates isCharacterTouchingSolid.
     */
    public generateIsPlayerTouchingSolid(): (player: IPlayer, solid: IThing) => boolean {
        /**
         * Generic checker for whether two characters are touching each other.
         * This checks to see if either has the nocollide flag, or if they're
         * overlapping, respecting tolerances.
         * 
         * @param player
         * @param character
         * @returns Whether player is touching solid.
         */
        return (player: IPlayer, solid: IThing): boolean => (
            player.right >= solid.left
            && player.left <= solid.right
            && player.bottom >= solid.top - 1
            && player.bottom <= solid.bottom - solid.height / 4);
    }

    /**
     * 
     */
    public generateHitPlayerCharacter(): (player: IPlayer, character: ICharacter) => boolean {
        return (player: IPlayer, character: ICharacter): boolean => {
            return character.onCollide(player, character);
        };
    }

    /**
     * 
     */
    public generateHitPlayerSolid(): (player: IPlayer, solid: IThing) => boolean {
        return (player: IPlayer, solid: IThing): boolean => {
            player.resting = solid;
            player.yvel = 0;

            this.gameStarter.timeHandler.cancelAllCycles(player);

            return false;
        };
    }
}
