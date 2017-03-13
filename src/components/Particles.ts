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
 * 
 */
export interface IParticleSettings {
    /**
     * 
     */
    color?: string;

    /**
     * 
     */
    midX: number;

    /**
     * 
     */
    midY: number;

    /**
     * 
     */
    stationary?: boolean;
}

/**
 * Particle generation and movement.
 */
export class Particles<TGameStartr extends Trumpicorn> extends Component<TGameStartr> {
    /**
     * 
     */
    private static readonly colors: string[] = [
        "normal", "red", "orange", "yellow", "green", "cyan", "blue", "purple"
    ];

    /**
     * 
     */
    public createSparkle(settings: IParticleSettings): IParticle {
        const particle: IParticle = this.gameStarter.objectMaker.make<IParticle>("Sparkle", {
            opacity: this.gameStarter.numberMaker.random(),
            opacityDelta: 0.01,
            scale: this.gameStarter.numberMaker.randomWithin(0.35, 3)
        });

        if (!settings.stationary) {
            particle.xvel = this.gameStarter.numberMaker.randomWithin(-0.35, 0.35);
            particle.yvel = this.gameStarter.numberMaker.randomWithin(-0.21, 0.35);
        }

        this.gameStarter.things.add(particle);
        this.gameStarter.physics.setMidX(particle, settings.midX);
        this.gameStarter.physics.setMidY(particle, settings.midY);

        particle.opacity /= 1.5;
        particle.opacityDelta /= 1.5;

        this.gameStarter.graphics.addClass(
            particle,
            settings.color || this.gameStarter.numberMaker.randomArrayMember(Particles.colors));

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
