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
                this.gameStarter.physics.shiftVert(player, player.resting.yvel);

                if (player.bottom < player.resting.top) {
                    this.gameStarter.physics.setBottom(player, player.resting.top);
                } else if (player.bottom > player.resting.top) {
                    this.gameStarter.physics.shiftVert(player, -1);
                }

                if (player.xvel > 0) {
                    player.xvel += .035;
                } else if (player.xvel < 0) {
                    player.xvel -= .035;
                }

                this.gameStarter.particles.createParticle(
                    this.gameStarter.numberMaker.randomWithin(player.left, player.right),
                    player.bottom);
            }
        }

        // Gravity
        if (!player.resting && player.yvel < 4.9) {
            player.yvel += .14;
        }

        // Vertical map boundaries
        if (player.yvel < 0) {
            if (player.bottom < this.gameStarter.mapScreener.top) {
                player.yvel = 0;
            } else if (player.top < this.gameStarter.mapScreener.top) {
                player.yvel *= .84;
            }
        } else {
            if (player.bottom >= this.gameStarter.mapScreener.bottom) {
                player.xvel *= 0.84;
                player.yvel = 0;
                this.gameStarter.physics.setBottom(player, this.gameStarter.mapScreener.bottom);
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

        // Flipping visuals
        if (player.xvel !== 0) {
            if (player.xvel > 0) {
                if (player.flipHoriz) {
                    this.gameStarter.graphics.unflipHoriz(player);
                }
            } else if (!player.flipHoriz) {
                this.gameStarter.graphics.flipHoriz(player);
            }
        } 

        // Particle visuals
        if (player.xvel !== 0 || player.yvel !== 0) {
            if (this.gameStarter.numberMaker.randomBooleanProbability(Math.abs(player.xvel) + Math.abs(player.yvel))) {
                this.gameStarter.particles.createParticle(
                    this.gameStarter.numberMaker.randomWithin(player.left, player.right),
                    player.bottom);
            }
        }

        // Running visuals
        if (!player.resting || player.xvel !== 0 || player.yvel !== 0) {
            if (!player.running) {
                player.running = true;
                this.gameStarter.graphics.addClass(player, "running");
                this.gameStarter.timeHandler.addClassCycle(
                    player,
                    ["two", "three", "four", "five", "normal"],
                    "running",
                    14);
            }
        } else if (player.running) {
            player.running = false;
            this.gameStarter.graphics.removeClasses(player, "running", "two", "three", "four", "five");
            this.gameStarter.timeHandler.cancelClassCycle(player, "running");
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
}
