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
        const height: number = 8;
        const top: number = this.gameStarter.mapScreener.height - height;
        const middleX: number = this.gameStarter.mapScreener.middleX;
        const rainbow: IThing = this.gameStarter.objectMaker.make<IThing>("Rainbow", {
            width: this.gameStarter.mapScreener.width
        });

        this.gameStarter.things.add(rainbow, top, 0);
        this.gameStarter.physics.setTop(rainbow, top);
        this.gameStarter.physics.setMidX(rainbow, middleX);

        return rainbow;
    }
}
