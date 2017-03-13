import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IPlayer } from "./Player";
import { ICharacter } from "./Things";

/**
 * 
 */
export interface IPowerupDescriptor {
    /**
     * 
     */
    duration: number;

    /**
     * How many points to award for getting this powerup, if any.
     */
    points?: number;
}

/**
 * 
 */
export interface IPowerup extends ICharacter {
    /**
     * 
     */
    descriptor: IPowerupDescriptor;
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
            duration: 280,
            points: 500
        }
    };

    /**
     * 
     */
    public readonly appearanceInterval: number = 490;

    /**
     * 
     */
    public movement(powerup: IPowerup): void {
        if (this.gameStarter.numberMaker.randomBooleanProbability(0.84)) {
            return;
        }

        this.gameStarter.particles.createSparkle({
            colors: ["red", "normal"],
            midX: this.gameStarter.numberMaker.randomWithin(powerup.left - 35, powerup.right + 35),
            midY: this.gameStarter.numberMaker.randomWithin(powerup.top - 35, powerup.bottom + 35),
            stationary: true
        });
    }

    /**
     * 
     */
    public onCollide(player: IPlayer, powerup: IPowerup): void {
        for (const trump of this.gameStarter.trumps) {
            this.gameStarter.trump.disable(trump, powerup.descriptor);
        }

        this.gameStarter.physics.killNormal(powerup);

        if (powerup.descriptor.points) {
            this.gameStarter.scoring.score({
                label: "POWERUP",
                points: powerup.descriptor.points,
                midX: this.gameStarter.physics.getMidX(player),
                midY: this.gameStarter.physics.getMidY(player)
            });
        }
    }

    /**
     * 
     * 
     * @todo Avoid immediate intersections?
     */
    public addPowerups(players: IPlayer[]): void {
        for (const player of players) {
            if (player.alive && !player.frozen) {
                this.createPowerupForPlayer(player);
            }
        }
    }

    /**
     * 
     */
    public createPowerupForPlayer(player: IPlayer): IPowerup {
        const powerup: IPowerup = this.createRandomPowerup();

        const coordinates: [number, number] = this.getPowerupCoordinates(player, powerup);

        this.gameStarter.things.add(powerup);
        this.gameStarter.physics.setMid(powerup, coordinates[0], coordinates[1]);

        this.gameStarter.timeHandler.addEvent(
            (): void => {
                powerup.opacity /= 2;
            },
            this.appearanceInterval * 0.7);

        this.gameStarter.timeHandler.addEvent(
            (): void => {
                if (powerup.alive) {
                    this.gameStarter.physics.killNormal(powerup);
                }
            },
            this.appearanceInterval);

        return powerup;
    }

    /**
     * 
     */
    private createRandomPowerup(): IPowerup {
        const title: string = this.gameStarter.numberMaker.randomArrayMember(Object.keys(Powerups.types));
        const powerup: IPowerup = this.gameStarter.objectMaker.make<IPowerup>(
            title,
            {
                descriptor: Powerups.types[title]
            });

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
