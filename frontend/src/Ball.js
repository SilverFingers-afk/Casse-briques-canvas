export class Ball {
    constructor(x, y, radius, vx, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.vx = vx;
        this.vy = vy;
    }

    update() {
    this.previousX = this.x;
    this.previousY = this.y;

    this.x += this.vx;
    this.y += this.vy;
}

    afficher(ctx) {
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            2 * Math.PI
        );

        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }

    checkWalls(width) {
    // Mur gauche
    if (this.x - this.radius <= 0) {
        this.x = this.radius;
        this.vx = Math.abs(this.vx);
    }

    // Mur droit
    if (this.x + this.radius >= width) {
        this.x = width - this.radius;
        this.vx = -Math.abs(this.vx);
    }

    // Plafond
    if (this.y - this.radius <= 0) {
        this.y = this.radius;
        this.vy = Math.abs(this.vy);
    }
  }

  checkPaddle(paddle) {
    const marge = 8;

    // Position du bas de la balle avant déplacement
    const previousBottom = this.previousY + this.radius;

    // Position du bas de la balle après déplacement
    const currentBottom = this.y + this.radius;

    const collision =
        this.vy > 0 &&
        previousBottom <= paddle.y &&
        currentBottom >= paddle.y &&
        this.x + this.radius >= paddle.x - marge &&
        this.x - this.radius <= paddle.x + paddle.width + marge;

    if (collision) {
        this.y = paddle.y - this.radius;
        this.vy = -Math.abs(this.vy);
    }
    }
    
    isLost(canvas) {
        return this.y - this.radius > canvas.height;
    }

    randomizeDirection() {
    const speed = Math.hypot(this.vx, this.vy);
    const currentAngle = Math.atan2(this.vy, this.vx);

    let angle;
    if (Math.random() < 0) {
        angle = Math.random() * 2 * Math.PI;
    } else {
        angle = currentAngle +
            (Math.random() * 2 - 1) * 10 * Math.PI / 180;
    }

    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    }
}
