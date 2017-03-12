import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IPlayer } from "./Player";
import { ICharacter } from "./Things";
import { ITrump } from "./Trump";

/**
 * 
 */
export interface IPowerupDescriptor {
    /**
     * 
     */
    duration: number;

    /**
     * How many points to award for getting this powerup.
     */
    points: number;

    /**
     * 
     */
    strength: number;
}

/**
 * 
 */
export interface IPowerup extends ICharacter {
    /**
     * 
     */
    descriptor: IPowerupDescriptor;

    /**
     * 
     */
    trump: ITrump;
}

/**
 * Powerup generation and effects.
 */
export class Powerups<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    private static readonly types: { [i: string]: IPowerupDescriptor } = {
        Powerup: {
            duration: 350,
            points: 500,
            strength: 2
        }
    };

    /**
     * 
     */
    public readonly interval: number = 490;

    /**
     * 
     */
    public onCollide(player: IPlayer, powerup: IPowerup): void {
        powerup.trump.disabledByPowerup = powerup.descriptor;
        this.gameStarter.graphics.addClass(powerup.trump, "disabled");
        this.gameStarter.physics.killNormal(powerup);

        this.gameStarter.scoring.score({
            label: "POWERUP",
            points: powerup.descriptor.points,
            midX: this.gameStarter.physics.getMidX(player),
            midY: this.gameStarter.physics.getMidY(player)
        });

        this.gameStarter.timeHandler.addEvent(
            (): void => {
                powerup.trump.disabledByPowerup = undefined;
                this.gameStarter.graphics.removeClass(powerup.trump, "disabled");
            },
            powerup.descriptor.duration);
    }

    /**
     * 
     * 
     * @todo Avoid immediate intersections?
     */
    public addPowerups(players: IPlayer[], trump: ITrump): void {
        for (const player of players) {
            this.createPowerupForPlayer(player, trump);
        }
    }

    /**
     * 
     */
    public createPowerupForPlayer(player: IPlayer, trump: ITrump): IPowerup {
        const powerup: IPowerup = this.createRandomPowerup(trump);

        const coordinates: [number, number] = this.getPowerupCoordinates(player, powerup);

        this.gameStarter.things.add(powerup);
        this.gameStarter.physics.setMid(powerup, coordinates[0], coordinates[1]);

        this.gameStarter.timeHandler.addEvent(
            (): void => {
                powerup.opacity /= 2;
            },
            this.interval * 0.7);

        this.gameStarter.timeHandler.addEvent(
            (): void => {
                if (powerup.alive) {
                    this.gameStarter.physics.killNormal(powerup);
                }
            },
            this.interval);

        return powerup;
    }

    /**
     * 
     */
    private createRandomPowerup(trump: ITrump): IPowerup {
        const title: string = this.gameStarter.numberMaker.randomArrayMember(Object.keys(Powerups.types));
        const powerup: IPowerup = this.gameStarter.objectMaker.make<IPowerup>(
            title,
            {
                descriptor: Powerups.types[title]
            });

        powerup.trump = trump;

        return powerup;
    }

    /**
     * 
     */
    private getPowerupCoordinates(player: IPlayer, powerup: IPowerup): [number, number] {
        const rangeX: [number, number] = [0, this.gameStarter.mapScreener.width];
        const rangeY: [number, number] = [0, this.gameStarter.mapScreener.height];

        if (this.gameStarter.physics.getMidX(player) < this.gameStarter.mapScreener.middleX) {
            rangeX[0] = rangeX[1] / 2;
        } else {
            rangeX[1] /= 2;
        }

        if (this.gameStarter.physics.getMidY(player) < this.gameStarter.mapScreener.middleY) {
            rangeY[0] = rangeY[1] / 2;
        } else {
            rangeY[1] /= 2;
        }

        return [
            this.gameStarter.numberMaker.randomWithin(rangeX[0] + powerup.width * 0.7, rangeX[1] - powerup.width * 0.7),
            this.gameStarter.numberMaker.randomWithin(rangeY[0] + powerup.height * 0.7, rangeY[1] - powerup.height * 0.7)
        ];
    }
}
