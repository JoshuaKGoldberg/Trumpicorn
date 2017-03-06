import { Graphics as GameStartrGraphics } from "gamestartr/lib/components/Graphics";

import { Trumpicorn } from "../Trumpicorn";

/**
 * Graphics functions used by Trumpicorn instances.
 */
export class Graphics<TGameStartr extends Trumpicorn> extends GameStartrGraphics<TGameStartr> {
    /**
     * Generates a black-blue-white-red gradient from the top-center of the screen
     * to the bottom-right for use as a PixelDrawr background.
     * 
     * @returns The resultant CanvasGradient.
     */
    public createNightGradient(): CanvasGradient {
        const context: CanvasRenderingContext2D = this.gameStarter.canvas.getContext("2d")!;
        const background: CanvasGradient = context.createLinearGradient(
            this.gameStarter.mapScreener.width / 2,
            0,
            this.gameStarter.mapScreener.width,
            this.gameStarter.mapScreener.height);

        background.addColorStop(0.14, "#000000");
        background.addColorStop(0.56, "#000014");
        background.addColorStop(0.84, "#140021");
        background.addColorStop(1, "#210021");

        return background;
    }
}
