import { BRICK_TYPES } from "./brickTypes.js";

export class Brick {
    constructor(x, y, width, height, type = "NORMAL") {
        const config = BRICK_TYPES[type];

        if (!config) {
            throw new Error(`Type de brique inconnu : ${type}`);
        }

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.type = type;
        this.color = config.color;
        this.strokeColor = config.strokeColor;
        this.resistance = config.resistance;
        this.points = config.points;
        this.score = config.points;
        this.maxResistance = this.resistance;

        this.alive = true;
    }

    draw(ctx) {
        if (!this.alive) return;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x + 2, this.y + 2, this.width - 4, this.height - 4);
        this.drawCracks(ctx);
    }

    hit(ball) {
    if (!this.alive) return null;

    const closestX = Math.max(
        this.x,
        Math.min(ball.x, this.x + this.width)
    );

    const closestY = Math.max(
        this.y,
        Math.min(ball.y, this.y + this.height)
    );

    const dx = ball.x - closestX;
    const dy = ball.y - closestY;

    if (dx * dx + dy * dy > ball.radius * ball.radius) {
        return null;
    }

    // Collision détectée

    if (Math.abs(dx) > Math.abs(dy)) {
        ball.vx = -ball.vx;
    } else {
        ball.vy = -ball.vy;
    }

    ball.randomizeDirection(0.05);

    // Brique indestructible
    if (this.resistance === Infinity) {
        return { points: 0 };
    }

    this.resistance--;

    if (this.resistance <= 0) {
        this.alive = false;
        return { points: this.score };
    }

    return { points: 0 };
}


drawCracks(ctx) {
    if (!this.alive) return;
    if (!Number.isFinite(this.maxResistance)) return;

    const damage = this.maxResistance - this.resistance;
    if (damage <= 0) return;

    const cx = this.x + this.width / 2;
    const cy = this.y + this.height / 2;

    ctx.save();

    // Empêche les fissures de sortir de la brique
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.clip();

    ctx.strokeStyle = "rgba(20, 20, 20, 0.8)";
    ctx.lineWidth = 1.5;

    // Chaque impact ajoute une fissure
    const count = Math.min(damage * 3, 15);

    for (let i = 0; i < count; i++) {
        const angle = (i * Math.PI * 2) / 15;
        const length = 8 + damage * 5;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(
            cx + Math.cos(angle) * length * 0.5,
            cy + Math.sin(angle) * length * 0.5
        );
        ctx.lineTo(
            cx + Math.cos(angle + 0.25) * length,
            cy + Math.sin(angle + 0.25) * length
        );
        ctx.stroke();
    }

    ctx.restore();
}

}