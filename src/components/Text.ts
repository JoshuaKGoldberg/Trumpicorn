import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "./Things";

/**
 * 
 */
export interface IAddTextSettings {
    /**
     * Titles for text Things, excluding the preceding "Text".
     */
    characters: string[];

    /**
     * Triggering Thing to center the score on top of
     */
    thing: IThing;
}

/**
 * Thing text visuals.
 */
export class Text<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    private static readonly textSpacing: number = 2;

    /**
     * 
     */
    private static readonly textWidth: number = 8;

    /**
     * 
     */
    private static readonly opacityDecrease: number = 0.02;

    /**
     * 
     */
    public addText(settings: IAddTextSettings): void {
        const texts: IThing[] = settings.characters
            .map((character: string): IThing => this.gameStarter.objectMaker.make<IThing>(
                "Text" + character,
                {
                    yvel: -0.25
                }));

        const totalWidth: number = texts.length * Text.textWidth + (texts.length - 1) * Text.textSpacing;
        const midX: number = this.gameStarter.physics.getMidX(settings.thing);
        const midY: number = this.gameStarter.physics.getMidY(settings.thing);

        let startX: number = midX - totalWidth / 2;

        for (const text of texts) {
            this.gameStarter.things.add(text);
            this.gameStarter.physics.setMid(text, startX, midY);

            startX += Text.textSpacing + Text.textWidth;
        }

        this.gameStarter.timeHandler.addEvent(
            (): void => {
                this.gameStarter.timeHandler.addEventInterval(
                    (): void => {
                        for (const text of texts) {
                            text.opacity -= Text.opacityDecrease;
                        }
                    },
                    1,
                    1 / Text.opacityDecrease);

                this.gameStarter.timeHandler.addEvent(
                    (): void => {
                        for (const text of texts) {
                            this.gameStarter.physics.killNormal(text);
                        }
                    },
                    (1 / Text.opacityDecrease) + 1);
            },
            35);
    }
}
