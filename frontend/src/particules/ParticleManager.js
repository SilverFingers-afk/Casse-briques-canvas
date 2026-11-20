import { Particle } from "./Particle.js";

export class ParticleManager {
    constructor() {
        this.particles = [];
    }

    explode(brick) {
        const cx = brick.x + brick.width / 2;
        const cy = brick.y + brick.height / 2;

        for (let i = 0; i < 20; i++) {
            this.particles.push(
                new Particle(cx, cy, brick.color)
            );
        }
    }

    update() {
        for (const particle of this.particles) {
            particle.update();
        }

        this.particles = this.particles.filter(
            particle => particle.alive
        );
    }

    afficher(ctx) {
        for (const particle of this.particles) {
            particle.afficher(ctx);
        }
    }
}