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
     * Whether the text should also float into the air.
     */
    floating?: boolean;

    /**
     * Horizontal midpoint to place text on.
     */
    midX: number;

    /**
     * Vertical midpoint to place text on.
     */
    midY: number;
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
    private static readonly textReplacements: { [i: string]: string } = {
        "'": "Apostrophe",
        "!": "ExclamationMark",
        " ": "Space"
    }

    /**
     * 
     */
    public addText(settings: IAddTextSettings): IThing[] {
        const texts: IThing[] = settings.characters
            .map((character: string): IThing => this.gameStarter.objectMaker.make<IThing>(
                "Text" + character,
                {
                    yvel: settings.floating ? -0.25 : 0
                }));

        const totalWidth: number = texts.length * Text.textWidth + (texts.length - 1) * Text.textSpacing;

        let startX: number = settings.midX - totalWidth / 2;

        for (const text of texts) {
            this.gameStarter.things.add(text);
            this.gameStarter.physics.setMid(text, startX, settings.midY);

            startX += Text.textSpacing + Text.textWidth;
        }

        if (settings.floating) {
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

        return texts;
    }

    /**
     * 
     * @param quote 
     */
    public processQuote(quote: string): string[] {
        return quote
            .split("")
            .map((character: string): string => Text.textReplacements[character] || character);
    }
}
