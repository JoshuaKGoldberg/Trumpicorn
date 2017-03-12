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
        const closestPlayer: IPlayer | undefined = this.getClosestPlayer(trump, this.gameStarter.players);
        if (!closestPlayer) {
            trump.xvel *= 0.98;
            trump.yvel *= 0.98;
            return;
        }

        const dx: number = this.gameStarter.physics.getMidX(closestPlayer) - this.gameStarter.physics.getMidX(trump);
        const dy: number = this.gameStarter.physics.getMidY(closestPlayer) - this.gameStarter.physics.getMidY(trump);

        let xvel: number = dx > 0
            ? Math.min(dx / 70, trump.speed)
            : Math.max(dx / 70, -trump.speed);
        let yvel: number = dy > 0
            ? Math.min(dy / 70, trump.speed)
            : Math.max(dy / 70, -trump.speed);

        if (closestPlayer.bottom > this.gameStarter.mapScreener.bottom - closestPlayer.height) {
            xvel *= 2.1;
            yvel *= 2.1;
        }

        trump.xvel = xvel;
        trump.yvel = yvel;
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
     */
    private getClosestPlayer(trump: ITrump, players: IPlayer[]): IPlayer | undefined {
        let bestDistance: number = -Infinity;
        let bestPlayer: IPlayer | undefined = undefined;

        for (const player of players) {
            if (!player.alive) {
                continue;
            }

            const distance: number = (
                Math.abs(this.gameStarter.physics.getMidX(trump) - this.gameStarter.physics.getMidX(player))
                + Math.abs(this.gameStarter.physics.getMidY(trump) - this.gameStarter.physics.getMidY(player)));

            if (distance > bestDistance) {
                bestDistance = distance;
                bestPlayer = player;
            }
        }

        return bestPlayer;
    }
}
