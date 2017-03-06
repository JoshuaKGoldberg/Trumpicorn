import { Maps as GameStartrMaps } from "gamestartr/lib/components/Maps";
import { ILocation } from "mapscreatr/lib/IMapsCreatr";

import { Trumpicorn } from "../Trumpicorn";

/**
 * Map functions used by Trumpicorn instances.
 */
export class Maps<TGameStartr extends Trumpicorn> extends GameStartrMaps<TGameStartr> {
    /**
     * 
     */
    public setLocation(name: string): ILocation {
        const location: ILocation = super.setLocation(name);

        this.gameStarter.pixelDrawer.setBackground(this.gameStarter.graphics.createNightGradient());
        this.gameStarter.stars.sprinkle();
        this.gameStarter.gamesRunner.play();

        return location;
    }
}
