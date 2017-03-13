import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IPlayer } from "./Player";
import { IPowerupDescriptor } from "./Powerups";
import { ICharacter } from "./Things";
import { Projectiles } from "./trump/Projectiles";

/**
 * 
 */
export interface ITrump extends ICharacter {
    /**
     * 
     */
    disabledByPowerups: number;

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
    public readonly projectiles: Projectiles<TGameStartr> = new Projectiles(this);

    /**
     * 
     */
    public readonly appearanceInterval: number = 2100;

    /**
     * 
     */
    public createAndPositionTrump(existingTrump?: ITrump): ITrump {
        const trump: ITrump = this.gameStarter.objectMaker.make<ITrump>("Trump");
        const duration: number = 280;

        this.gameStarter.things.add(trump);

        if (!existingTrump) {
            this.gameStarter.physics.setMidX(trump, this.gameStarter.mapScreener.middleX / 2);
            this.gameStarter.physics.setMidY(trump, this.gameStarter.mapScreener.middleY / 2);
            return trump;
        }

        this.gameStarter.physics.setMidObj(trump, existingTrump);
        this.disable(trump, { duration });
        this.disable(existingTrump, { duration });

        this.gameStarter.timeHandler.addEventInterval(
            (): void => {
                this.gameStarter.physics.shiftHoriz(trump, 0.35);
                this.gameStarter.physics.shiftHoriz(existingTrump, -0.35);
            },
            1,
            duration);

        return trump;
    }

    /**
     * 
     */
    public disable(trump: ITrump, powerup: IPowerupDescriptor): void {
        if (trump.disabledByPowerups === 0) {
            this.gameStarter.graphics.addClass(trump, "disabled");
        }

        trump.disabledByPowerups += 1;

        this.gameStarter.timeHandler.addEvent(
            (): void => {
                trump.disabledByPowerups -= 1;

                if (trump.disabledByPowerups === 0) {
                    this.gameStarter.graphics.removeClass(trump, "disabled");
                }
            },
            powerup.duration);
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

        trump.xvel = dx / Math.sqrt(dx ** 2 + dy ** 2) * trump.speed;
        trump.yvel = dy / Math.sqrt(dx ** 2 + dy ** 2) * trump.speed;

        if (trump.disabledByPowerups) {
            trump.xvel /= -7;
            trump.yvel /= -7;
        } else if (closestPlayer.bottom > this.gameStarter.mapScreener.bottom - closestPlayer.height) {
            trump.xvel *= 2.1;
            trump.yvel *= 2.1;
        }

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
    public launchProjectile(trump: ITrump, interval: number): void {
        this.projectiles.launchFromTrumpToPlayer(
            trump,
            this.gameStarter.numberMaker.randomArrayMember(this.gameStarter.players));

        if (interval > 117) {
            interval -= 5;
        }

        this.gameStarter.timeHandler.addEvent(
            (): void => this.launchProjectile(trump, interval),
            interval);
    }

    /**
     * 
     */
    private getClosestPlayer(trump: ITrump, players: IPlayer[]): IPlayer | undefined {
        let bestDistance: number = Infinity;
        let bestPlayer: IPlayer | undefined = undefined;

        for (const player of players) {
            if (!player.alive) {
                continue;
            }

            const distance: number = (
                Math.abs(this.gameStarter.physics.getMidX(trump) - this.gameStarter.physics.getMidX(player))
                + Math.abs(this.gameStarter.physics.getMidY(trump) - this.gameStarter.physics.getMidY(player)));

            if (distance < bestDistance) {
                bestDistance = distance;
                bestPlayer = player;
            }
        }

        return bestPlayer;
    }
}
