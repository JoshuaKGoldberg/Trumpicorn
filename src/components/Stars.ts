import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "./Things";

/**
 * Star functions used by Trumpicorn instances.
 */
export class Stars<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * Adds Star Things scattered across the sky randomly.
     */
    public sprinkle(): void {
        const distanceBetween: number = 35;
        const screenWidth: number = this.gameStarter.mapScreener.width;
        const starColumns: number = 1 + screenWidth / distanceBetween;

        for (let left: number = -this.gameStarter.numberMaker.randomInt(starColumns); left < screenWidth; left += distanceBetween) {
            const top: number = this.gameStarter.numberMaker.randomIntWithin(-28, screenWidth);

            this.gameStarter.things.add("Star", left, top);
        }
    }

    /**
     * 
     */
    public onStarAdded(star: IThing): void {
        star.yvel = this.gameStarter.numberMaker.randomWithin(-0.14, -0.28);

        this.gameStarter.timeHandler.addClassCycle(
            star,
            ["one", "two", "three"],
            "shimmer",
            this.gameStarter.numberMaker.randomIntWithin(49, 84));

        this.gameStarter.graphics.addClass(
            star,
            this.gameStarter.numberMaker.randomArrayMember(["one", "two", "three"]));
    }

    /**
     * 
     */
    public movement(star: IThing): void {
        if (star.bottom < 0) {
            this.gameStarter.physics.setTop(star, this.gameStarter.mapScreener.bottom);
        }
    }
}
