import { Brick } from './Brick.js';
import { BRICK_SYMBOLS } from '../levels.js';

export class BrickManager {
  constructor(level, canvasWidth, height, width) {
    this.level = level;
    this.canvasWidth = canvasWidth;
    this.height = height;
    this.width = width;
    this.bricks = [];
  }

  loadLevel() {
    this.bricks = [];
    let y = 40;
    for (let e of this.level) {
      let ligne = [];
      let x = (this.canvasWidth - (this.width * this.level[0].length))/ 2;
      for (let f of e) {
        ligne.push(
          new Brick(x, y, this.width, this.height, BRICK_SYMBOLS[f])
        );
        x += this.width;
      }
      this.bricks.push(ligne);
      y += this.height;
    }
  }

  afficher(context) {
    for (let row of this.bricks) {
      for (let brick of row) {
        brick.draw(context);
      }
    }
  }

  checkCollisions(ball, particleManager) {
    for (const ligne of this.bricks) {
        for (const brick of ligne) {
            const wasAlive = brick.alive;

            const result = brick.hit(ball);

            if (result !== null) {
                if (wasAlive && !brick.alive) {
                    particleManager.explode(brick);
                }

                return result.points;
            }
        }
    }

    return 0;
}

  isCompleted() {
    return this.bricks.every(ligne =>
      ligne.every(brick =>
        !brick.alive || brick.resistance === Infinity
      )
    );
  }
}