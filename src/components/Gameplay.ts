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

        const rainbow: IThing = this.gameStarter.rainbows.createAndPositionRainbow();

        this.gameStarter.players = [
            this.gameStarter.player.createOnRainbow(rainbow)
        ];

        this.addTrump();

        this.gameStarter.timeHandler.addEventInterval(
            (): void => {
                this.gameStarter.powerups.addPowerups(this.gameStarter.players);
            },
            this.gameStarter.powerups.appearanceInterval,
            Infinity);

        this.gameStarter.timeHandler.addEventInterval(
            (): void => this.gameStarter.scoring.timedDecrease(),
            14,
            Infinity);

        this.gameStarter.help.showInitialText();

        super.gameStart();
    }

    /**
     * 
     */
    private addTrump(): void {
        const trump: ITrump = this.gameStarter.trump.createAndPositionTrump(this.gameStarter.trumps[0]);

        this.gameStarter.timeHandler.addEvent(
            (): void => this.gameStarter.trump.launchProjectile(
                trump,
                this.gameStarter.trump.projectiles.intervalStart),
            this.gameStarter.trump.projectiles.intervalStart);

        this.gameStarter.timeHandler.addEvent(
            (): void => this.addTrump(),
            this.gameStarter.trump.appearanceInterval + this.gameStarter.trumps.length * 350);

        this.gameStarter.trumps.push(trump);
    }
}
