export class Paddle {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  afficher(ctx){
    //context.fillStyle = '#a8e4c4'; context.fillRect(this.x, this.y, this.width, this.height);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);    // Point 1
    ctx.lineTo(this.x + this.width, this.y);   // Point 2
    ctx.lineTo(this.x + this.width/2, this.y + this.height);  // Point 3
    ctx.closePath();       // Ferme la forme
    ctx.strokeStyle = "#00a74e";
    ctx.stroke();          // Trace les contours
    ctx.fillStyle = "#a8e4c4";
    ctx.fill();  
  }
}