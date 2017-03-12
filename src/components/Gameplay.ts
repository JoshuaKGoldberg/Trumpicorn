import { Gameplay as GameStartrGameplay } from "gamestartr/lib/components/Gameplay";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "./Things";

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

        const rainbow: IThing = this.gameStarter.rainbows.createAndPositionRainbow();

        this.gameStarter.players = [
            this.gameStarter.player.createAndPositionPlayer(rainbow)
        ];

        this.gameStarter.trump.createAndPositionTrump();

        super.gameStart();
    }
}
