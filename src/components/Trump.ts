import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IPlayer } from "./Player";
import { ICharacter } from "./Things";

/**
 * 
 */
export interface ITrump extends ICharacter {
    /**
     * 
     */
    speed: number;
}

/**
 * Trump functions used by Trumpicorn instances.
 */
export class Trump<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    public createAndPositionTrump(): ITrump {
        const trump: ITrump = this.gameStarter.objectMaker.make<ITrump>("Trump");

        this.gameStarter.things.add(trump);
        this.gameStarter.physics.setMidX(trump, this.gameStarter.mapScreener.middleX / 2);
        this.gameStarter.physics.setMidY(trump, this.gameStarter.mapScreener.middleY / 2);

        return trump;
    }

    /**
     * 
     */
    public movement(trump: ITrump): void {
        const closestPlayer: IPlayer = this.getClosestPlayer(trump, this.gameStarter.players);
        const distanceX: number = this.gameStarter.physics.getMidX(closestPlayer) - this.gameStarter.physics.getMidX(trump);
        const distanceY: number = this.gameStarter.physics.getMidY(closestPlayer) - this.gameStarter.physics.getMidY(trump);

        const dx: number = distanceX > 0
            ? Math.min(distanceX / 70, trump.speed)
            : Math.max(distanceX / 70, -trump.speed);
        const dy: number = distanceY > 0
            ? Math.min(distanceY / 70, trump.speed)
            : Math.max(distanceY / 70, -trump.speed);

        this.gameStarter.physics.shiftBoth(trump, dx, dy);

        trump.speed += 0.00007;
    }

    /**
     * 
     */
    public onCollide(player: IPlayer): void {
        this.gameStarter.player.die(player);
    }

    /**
     * 
     * 
     * @todo Expand for multiplayer?
     */
    private getClosestPlayer(_trump: ITrump, players: IPlayer[]): IPlayer {
        return players[0];
    }
}
