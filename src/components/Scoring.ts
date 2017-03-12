import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";

/**
 * 
 */
export interface IAddPointsSettings {
    /**
     * Displayed text for the score.
     */
    label: string;

    /**
     * Horizontal midpoint to place text on.
     */
    midX: number;

    /**
     * Vertical midpoint to place text on.
     */
    midY: number;

    /**
     * How many points to award.
     */
    points: number;
}

/**
 * Scoring additions and visuals.
 */
export class Scoring<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    private static readonly textDisplayStart: string[] = [
        ..."POINTS".split(""),
        "Space"
    ];

    /**
     * 
     */
    public score(settings: IAddPointsSettings): void {
        this.gameStarter.itemsHolder.increase("score", settings.points);

        this.gameStarter.text.addText({
            characters: [
                ...settings.label.split(""),
                "ExclamationMark",
                "Space",
                ...settings.points.toString().split("")
            ],
            floating: true,
            midX: settings.midX,
            midY: settings.midY
        });
    }

    /**
     * 
     */
    public maintain(): void {
        if (this.gameStarter.textDisplay) {
            for (const text of this.gameStarter.textDisplay) {
                this.gameStarter.physics.killNormal(text);
            }
        }

        this.gameStarter.textDisplay = this.gameStarter.text.addText({
            characters: [
                ...Scoring.textDisplayStart,
                ...this.gameStarter.itemsHolder.getItem("score").toString().split("")
            ],
            midX: this.gameStarter.mapScreener.middleX,
            midY: 10
        });
    }

    /**
     * Decreases the score by 10 if any player is alive and unfrozen.
     */
    public timedDecrease(): void {
        for (const player of this.gameStarter.players) {
            if (player.alive && !player.frozen) {
                this.gameStarter.itemsHolder.decrease("score", 10);
                return;
            }
        }
    }
}
