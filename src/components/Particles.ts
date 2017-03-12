import { Component } from "eightbittr/lib/Component";

import { Trumpicorn } from "../Trumpicorn";
import { IThing } from "./Things";

/**
 * 
 */
export interface IParticle extends IThing {
    /**
     * 
     */
    opacityDelta: number;
}

/**
 * Particle generation and movement.
 */
export class Particles<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    private static readonly colors: string[] = [
        "red", "orange", "yellow", "green", "cyan", "blue", "purple"
    ];

    /**
     * 
     */
    public createParticle(midX: number, midY: number): IParticle {
        const particle: IParticle = this.gameStarter.objectMaker.make<IParticle>("Sparkle", {
            opacity: this.gameStarter.numberMaker.random(),
            opacityDelta: 0.01,
            xvel: this.gameStarter.numberMaker.randomWithin(-0.35, 0.35),
            yvel: this.gameStarter.numberMaker.randomWithin(-0.21, 0.35)
        });

        this.gameStarter.things.add(particle);
        this.gameStarter.physics.setMidX(particle, midX);
        this.gameStarter.physics.setMidY(particle, midY);

        if (this.gameStarter.numberMaker.randomBooleanProbability(0.7)) {
            particle.opacity /= 1.5;
            particle.opacityDelta /= 1.5;

            this.gameStarter.graphics.addClass(
                particle,
                this.gameStarter.numberMaker.randomArrayMember(Particles.colors));
        }

        return particle;
    }

    /**
     * 
     */
    public movement(particle: IParticle): void {
        particle.yvel += 0.005;
        particle.opacity -= particle.opacityDelta;
        particle.opacity += this.gameStarter.numberMaker.randomWithin(
            -particle.opacityDelta / 2.1,
            particle.opacityDelta / 2.1);

        if (particle.opacity <= 0) {
            this.gameStarter.physics.killNormal(particle);
        }

        particle.scale = this.gameStarter.numberMaker.randomWithin(
            particle.scale! + 0.07,
            particle.scale! - 0.1);
    }
}
