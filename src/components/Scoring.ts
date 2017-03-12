import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "./Things";

/**
 * 
 */
export interface IAddPointsSettings {
    /**
     * Displayed text for the score.
     */
    label: string;

    /**
     * How many points to award.
     */
    points: number;

    /**
     * Triggering Thing to center the score on top of
     */
    thing: IThing;
}

/**
 * Scoring additions and visuals.
 */
export class Scoring<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    public score(settings: IAddPointsSettings): void {
        this.gameStarter.itemsHolder.increase("points", settings.points);

        this.gameStarter.text.addText({
            characters: [
                ...settings.label.split(""),
                "ExclamationMark",
                "Space",
                ...settings.points.toString().split("")
            ],
            thing: settings.thing
        });
    }
}
