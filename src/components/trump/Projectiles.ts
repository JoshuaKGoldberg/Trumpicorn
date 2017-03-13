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
        "Kellyane", "Pence", "Spicer"
    ];

    /**
     * 
     */
    private static readonly quotes: string[] = [
        "ALTERNATIVE FACTS!",
        "BUILD THE WALL!",
        "GOOD PEOPLE DON'T GO INTO GOVERNMENT",
        "GRAB THEM!",
        "I'M VERY RICH!",
        "JINA",
        "MY IQ IS ONE OF THE HIGHEST",
        "NEGATIVE POLLS ARE FAKE NEWS!",
        "SAD!",
        "YOU'RE DISGUSTING!"
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
        const trumpY: number = this.gameStarter.physics.getMidY(trump);
        const projectileType: string = this.gameStarter.numberMaker.randomArrayMember(Projectiles.projectileTypes);
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

        this.gameStarter.graphics.addClass(projectile, projectileType);
        this.gameStarter.physics.setMidObj(projectile, trump);

        this.gameStarter.text.addText({
            characters: this.gameStarter.text.processQuote(
                this.gameStarter.numberMaker.randomArrayMember(Projectiles.quotes)),
            floating: true,
            midX: trumpX,
            midY: trumpY
        });

        return projectile;
    }

    /**
     * 
     */
    public onCollide(player: IPlayer, projectile: IProjectile): void {
        this.gameStarter.physics.killNormal(projectile);
        this.gameStarter.player.die(player);
    }
}
