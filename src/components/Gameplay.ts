import { Gameplay as GameStartrGameplay } from "gamestartr/lib/components/Gameplay";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "./Things";
import { ITrump } from "./Trump";

/**
 * Gameplay functions used by Trumpicorn instances.
 */
export class Gameplay<TGameStartr extends Trumpicorn> extends GameStartrGameplay<TGameStartr> {
    /**
     * Completely restarts the game.
     */
    public gameStart(): void {
        this.gameStarter.itemsHolder.setItem("score", 0);
        this.gameStarter.itemsHolder.setItem("heads", 0);

        this.gameStarter.maps.setMap("America", "Freedom");

        const trump: ITrump = this.gameStarter.trump.createAndPositionTrump();
        const rainbow: IThing = this.gameStarter.rainbows.createAndPositionRainbow();

        this.gameStarter.players = [
            this.gameStarter.player.createAndPositionPlayer(rainbow)
        ];

        this.gameStarter.timeHandler.addEventInterval(
            (): void => {
                this.gameStarter.powerups.addPowerups(this.gameStarter.players, trump);
            },
            this.gameStarter.powerups.interval,
            Infinity);

        this.gameStarter.timeHandler.addEventInterval(
            (): void => this.gameStarter.scoring.timedDecrease(),
            14,
            Infinity);

        super.gameStart();
    }
}
