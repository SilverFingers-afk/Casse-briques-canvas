
export class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.size = 2 + Math.random() * 5;

        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;

        this.life = 1;
        this.decay = 0.02 + Math.random() * 0.02;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Gravité
        this.vy += 0.12;

        // Ralentissement horizontal
        this.vx *= 0.99;

        // Disparition progressive
        this.life -= this.decay;
    }

    afficher(ctx) {
        ctx.save();

        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;

        ctx.fillRect(
            this.x,
            this.y,
            this.size,
            this.size
        );

        ctx.restore();
    }

    get alive() {
        return this.life > 0;
    }
}
