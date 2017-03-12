import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../../Trumpicorn";
import { IPlayer } from "../Player";
import { IThing } from "../Things";

/**
 * Player maintenance functions.
 */
export class Maintenance<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    public maintain(): void {
        for (const player of this.gameStarter.groupHolder.getGroup("Player") as IPlayer[]) {
            this.maintainPlayer(player);
        }
    }

    /**
     * 
     */
    public maintainPlayer(player: IPlayer): void {
        if (player.frozen) {
            return;
        }

        this.gameStarter.thingHitter.checkHitsForThing(player);

        // Horizontal slowdown
        if (Math.abs(player.xvel) > 0.35) {
            player.xvel *= 0.96;
        } else {
            player.xvel = 0;
            this.stopRunning(player);
        }

        // Key speed-ups
        if (Math.abs(player.xvel) <= 4.9) {
            if (player.keys.right) {
                player.xvel += 0.49;
            } else if (player.keys.left) {
                player.xvel -= 0.49;
            }
        }

        // Jumping
        if (player.keys.up && !player.jumping) {
            this.gameStarter.player.jumping.jump(player);
        }

        // Resting
        if (player.resting) {
            if (this.isOffResting(player, player.resting)) {
                player.xvel += player.resting.xvel;
                player.resting = undefined;
            } else {
                this.gameStarter.physics.shiftHoriz(player, player.resting.xvel);
                this.gameStarter.physics.setBottom(player, player.resting.top);

                if (player.xvel > 0) {
                    player.xvel += .035;
                } else if (player.xvel < 0) {
                    player.xvel -= .035;
                }
            }
        }

        // Gravity
        if (!player.resting && player.yvel < 4.9) {
            player.yvel += .14;
        }

        // Top map boundary
        if (player.yvel < 0) {
            if (player.bottom < this.gameStarter.mapScreener.top) {
                player.yvel = 0;
            } else if (player.top < this.gameStarter.mapScreener.top) {
                player.yvel *= .84;
            }
        }

        // Horizontal boundaries
        if (player.left < 0) {
            this.gameStarter.physics.setLeft(player, 0);
            player.xvel = 0;
        } else if (player.right > this.gameStarter.mapScreener.right) {
            this.gameStarter.physics.setRight(player, this.gameStarter.mapScreener.right);
            player.xvel = 0;
        }

        // Collisions
        this.gameStarter.thingHitter.checkHitsForThing(player);
    }

    /**
     * 
     */
    private isOffResting(player: IPlayer, resting: IThing): boolean {
        return player.left > resting.right || player.right < resting.left;
    }

    /**
     * 
     */
    private stopRunning(_player: IPlayer): void {
        // ...
    }
}
