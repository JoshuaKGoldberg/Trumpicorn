import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../../Trumpicorn";
import { IPlayer } from "../Player";

/**
 * Player jumping functions.
 */
export class Jumping<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    private static readonly pointsDefault: number = 20;
    /**
     * 
     */
    public jump(player: IPlayer): void {
        const midX: number = this.gameStarter.physics.getMidX(player);
        const midY: number = this.gameStarter.physics.getMidY(player);
        let label: string = "JUMP";
        let points: number = Jumping.pointsDefault;
        let sparkles: number = 7;

        if (player.resting) {
            this.gameStarter.physics.shiftVert(player, -Math.abs(player.resting.yvel));
        }

        player.yvel = -4.2;
        if (player.resting && (player.xvel > 0) === (player.resting.xvel > 0)) {
            player.yvel -= Math.abs(player.xvel);
            player.xvel += player.xvel / 2.1 + player.resting.xvel * 2.1;

            label = "BOOST";
            points += Math.min(Math.floor(Math.abs(player.xvel) * Math.abs(player.yvel)) + 5, 150);
            sparkles += Math.ceil(Math.abs(player.xvel) + Math.abs(player.yvel));
        }

        player.jumping = true;
        player.resting = undefined;

        this.gameStarter.scoring.score({ label, midX, midY, points });
        this.gameStarter.physics.shiftVert(player, player.yvel);
        this.gameStarter.timeHandler.addEvent(
            (): void => {
               player.jumping = false;
            },
            35);

        this.gameStarter.timeHandler.addEventInterval(
            (): boolean => {
                this.createJumpSparkles(player, sparkles);

                sparkles -= 1;
                return sparkles === 0;
            },
            1,
            Infinity);
    }

    /**
     * 
     */
    private createJumpSparkles(player: IPlayer, quantity: number): void {
        for (let i: number = 0; i < quantity; i += 1) {
            this.gameStarter.particles.createSparkle({
                midX: this.gameStarter.numberMaker.randomWithin(player.left, player.right),
                midY: this.gameStarter.numberMaker.randomWithin(player.top, player.bottom)
            });
        }
    }
}
