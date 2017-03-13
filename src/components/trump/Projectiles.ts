import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../../Trumpicorn";
import { IPlayer } from "../Player";
import { IThing } from "../Things";
import { ITrump } from "../Trump";

export interface IProjectile extends IThing {
    /**
     * How quickly this moves across the screen.
     */
    speed: number;
}

/**
 * Projectiles launched by Trump.
 */
export class Projectiles<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    private static readonly projectileTypes: string[] = [
        "normal", "two", "three"
    ];

    /**
     * 
     */
    public readonly intervalStart: number = 280;

    /**
     * 
     */
    public readonly intervalPeak: number = 70;

    /**
     * 
     */
    public launchFromTrumpToPlayer(trump: ITrump, player: IPlayer): IProjectile {
        const trumpX: number = this.gameStarter.physics.getMidX(trump);
        const trumpY: number = this.gameStarter.physics.getMidY(trump) + trump.height / 3.5;
        const dx: number = this.gameStarter.physics.getMidX(player) - trumpX;
        const dy: number = this.gameStarter.physics.getMidY(player) - trumpY;
        const projectile: IProjectile = this.gameStarter.things.add("Projectile") as IProjectile;

        projectile.xvel = dx / Math.sqrt(dx ** 2 + dy ** 2) * projectile.speed;
        projectile.yvel = dy / Math.sqrt(dx ** 2 + dy ** 2) * projectile.speed;

        if (this.gameStarter.physics.thingToLeft(trump, player)) {
            this.gameStarter.physics.shiftHoriz(projectile, trump.width / 4);
        } else {
            this.gameStarter.physics.shiftHoriz(projectile, -trump.width / 4);
        }

        this.gameStarter.graphics.addClass(projectile, this.gameStarter.numberMaker.randomArrayMember(Projectiles.projectileTypes));
        this.gameStarter.physics.setMidX(projectile, trumpX);
        this.gameStarter.physics.setMidY(projectile, trumpY);

        return projectile;
    }

    /**
     * 
     */
    public movement(projectile: IProjectile): void {
        this.gameStarter.particles.createSparkle({
            midX: this.gameStarter.physics.getMidX(projectile),
            midY: this.gameStarter.physics.getMidY(projectile),
            colors: ["red", "orange", "yellow"]
        });
    }

    /**
     * 
     */
    public onCollide(player: IPlayer, projectile: IProjectile): void {
        this.gameStarter.physics.killNormal(projectile);
        this.gameStarter.player.die(player);
    }
}
