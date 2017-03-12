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
    public createBottomRainbow(): IThing {
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
     * 
     * @todo Actually compute dx, dy, maxX, maxY
     */
    public movement(thing: IThing): void {
        const dx: number = this.gameStarter.mapScreener.width / 42000;
        const dy: number = this.gameStarter.mapScreener.height / 42000;
        const maxX: number = this.gameStarter.mapScreener.width / 21;
        const maxY: number = this.gameStarter.mapScreener.height / 56;

        if (this.gameStarter.physics.getMidX(thing) > this.gameStarter.mapScreener.middleX) {
            thing.xvel = Math.max(thing.xvel - dx, -maxX);
        } else {
            thing.xvel = Math.min(thing.xvel + dx, maxX);
        }

        if (this.gameStarter.physics.getMidY(thing) > this.gameStarter.mapScreener.middleY) {
            thing.yvel = Math.max(thing.yvel - dy, -maxY);
        } else {
            thing.yvel = Math.min(thing.yvel + dy, maxY);
        }
    }
}
