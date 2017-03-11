import { Gameplay as GameStartrGameplay } from "gamestartr/lib/components/Gameplay";

import { Trumpicorn } from "../Trumpicorn";
import { IPlayer } from "./Player";

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

        this.gameStarter.players = [
            this.createAndPositionPlayer()
        ];

        super.gameStart();
    }

    /**
     * 
     */
    private createAndPositionPlayer(): IPlayer {
        const player: IPlayer = this.gameStarter.objectMaker.make<IPlayer>("Player");

        this.gameStarter.physics.setMidX(player, this.gameStarter.mapScreener.middleX);
        this.gameStarter.physics.setBottom(player, this.gameStarter.mapScreener.height - 70);
        this.gameStarter.things.add(player);

        return player;
    }
}
