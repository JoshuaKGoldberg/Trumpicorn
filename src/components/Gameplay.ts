import { Gameplay as GameStartrGameplay } from "gamestartr/lib/components/Gameplay";

import { Trumpicorn } from "../Trumpicorn";
import { IPlayer } from "./Player";
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

        const rainbow: IThing = this.gameStarter.rainbows.createBottomRainbow();

        this.gameStarter.players = [
            this.createAndPositionPlayer(rainbow)
        ];

        super.gameStart();
    }

    /**
     * 
     * 
     * @todo Extend for multiplayer?
     */
    private createAndPositionPlayer(rainbow: IThing): IPlayer {
        const player: IPlayer = this.gameStarter.objectMaker.make<IPlayer>("Player");

        this.gameStarter.physics.setMidXObj(player, rainbow);
        this.gameStarter.physics.setBottom(player, rainbow.top);
        player.resting = rainbow;
        this.gameStarter.things.add(player);

        return player;
    }
}
