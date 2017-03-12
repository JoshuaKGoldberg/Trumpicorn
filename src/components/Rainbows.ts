import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "./Things";

/**
 * Rainbow functions used by Trumpicorn instances.
 */
export class Rainbows<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    public createAndPositionRainbow(): IThing {
        const middleX: number = this.gameStarter.mapScreener.middleX;
        const twoThirdsY: number = this.gameStarter.mapScreener.middleY * 1.5;
        const rainbow: IThing = this.gameStarter.objectMaker.make<IThing>("Rainbow", {
            xvel: this.gameStarter.mapScreener.width / 350,
            yvel: this.gameStarter.mapScreener.height / 350,
            width: 210
        });

        this.gameStarter.things.add(rainbow);
        this.gameStarter.physics.setMid(rainbow, middleX, twoThirdsY);

        return rainbow;
    }

    /**
     * 
     */
    public movement(rainbow: IThing): void {
        const dx: number = this.gameStarter.mapScreener.width / 42000;
        const dy: number = this.gameStarter.mapScreener.height / 42000;
        const maxX: number = this.gameStarter.mapScreener.width / 21;
        const maxY: number = this.gameStarter.mapScreener.height / 56;

        if (this.gameStarter.physics.getMidX(rainbow) > this.gameStarter.mapScreener.middleX) {
            rainbow.xvel = Math.max(rainbow.xvel - dx, -maxX);
        } else {
            rainbow.xvel = Math.min(rainbow.xvel + dx, maxX);
        }

        if (this.gameStarter.physics.getMidY(rainbow) > this.gameStarter.mapScreener.middleY) {
            rainbow.yvel = Math.max(rainbow.yvel - dy, -maxY);
        } else {
            rainbow.yvel = Math.min(rainbow.yvel + dy, maxY);
        }

        for (let i: number = 0; i < 3; i += 1) {
            this.gameStarter.particles.createParticle(
                this.gameStarter.numberMaker.randomWithin(rainbow.left, rainbow.right),
                this.gameStarter.physics.getMidY(rainbow));
        }
    }
}
