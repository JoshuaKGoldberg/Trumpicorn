import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "./Things";

/**
 * Displays help text as needed.
 */
export class Help<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    public showInitialText(): void {
        const texts: IThing[] = [
            ...this.gameStarter.text.addText({
                characters: this.gameStarter.text.processText("ARROW KEYS FOR SINGLE PLAYER"),
                midX: this.gameStarter.mapScreener.middleX,
                midY: this.gameStarter.mapScreener.middleY - 8,
            }),
            ...this.gameStarter.text.addText({
                characters: this.gameStarter.text.processText("AWD FOR MULTIPLAYER"),
                midX: this.gameStarter.mapScreener.middleX,
                midY: this.gameStarter.mapScreener.middleY + 8,
            })
        ];

        this.gameStarter.timeHandler.addEvent(
            (): void => {
                for (const text of texts) {
                    this.gameStarter.physics.killNormal(text);
                }
            },
            350);
    }

    /**
     * 
     */
    public showEndText(): void {
        this.gameStarter.text.addText({
            characters: this.gameStarter.text.processText("NICE TRY!"),
            midX: this.gameStarter.mapScreener.middleX,
            midY: this.gameStarter.mapScreener.middleY - 8,
        });

        this.gameStarter.text.addText({
            characters: this.gameStarter.text.processText("PRESS SPACE TO GO AGAIN"),
            midX: this.gameStarter.mapScreener.middleX,
            midY: this.gameStarter.mapScreener.middleY + 8,
        });
    }
}
