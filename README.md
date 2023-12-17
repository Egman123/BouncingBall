# BouncingBall

##About  

This project is an animation of bouncing balls with the addition of falling snow. The balls are displayed on an HTML canvas, and the animation creates the illusion of bouncing and moving balls, along with a visual snowfall effect.

##Installation and Usage

creating package.json file
 npm init -y
installation typescript
 npm i --save-dev typescript
creating tsconfig.json file
  npx tsc --init

##Examples

Code examples and comments can be found in the source file main.ts, which represents TypeScript code for creating and animating bouncing balls.

class BouncingBall {
  res: number;
  x: number;
  y: number;
  radius: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
  friction: number;
  color_hex: string;
  opacity: number;
  constructor(x: number, y: number) {
    this.res;
    this.x = x;
    this.y = y;
    this.radius = 40;
    this.velocityX = randomNum(1, 15);
    this.velocityY = randomNum(1, 15);
    this.gravity = Math.max(Math.random(), 0.5);
    this.friction = Math.max(Math.random(), 0.5);
    this.color_hex =
      "#" + [...Array(6)].map(() => randomNum(0, 16).toString(16)).join("");
    this.opacity = 255;
  }
  drawBall(): void {
    if (!context) return;
    context.beginPath();
    const gradient = context.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(1, this.color_hex + this.opacity.toString(16));
    context.fillStyle = gradient;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.strokeStyle = "#333";
    context.lineWidth = 2;
    context.stroke();
    context.fill();
  }
  drawBallText(): void {
    if (!context) return;
    let x = Math.round(this.x);
    let y = Math.round(this.y);
    let vx = Math.round(this.velocityY);
    let vy = Math.round(this.velocityY);
    let text = `x: ${x}, y: ${y}, vx: ${vx}, vy: ${vy}`;
    context.font = "15px Arial";
    context.fillStyle = "#ffffff";
    context.fillText(text, this.x + this.radius + 5, this.y);
    context.beginPath();
    context.moveTo(this.x - this.radius, this.y + this.radius);
    context.lineTo(this.x + this.radius, this.y + this.radius);
    context.stroke();
  }
  moveBall(deltaTime: number): void {
    if (this.y + this.radius < canvas?.height) {
      this.velocityY += 1;
    }
    this.y += this.velocityY;
    this.x += this.velocityX;
    if (this.y + this.radius >= canvas?.height) {
      if (this.velocityY > 0) {
        this.velocityY = -this.velocityY;
      }

      this.velocityY *= this.gravity;
      this.res = this.velocityY;
      this.velocityX *= this.friction;
    }
    if (this.x + this.radius > canvas?.width || this.x - this.radius <= 0) {
      this.velocityX = -this.velocityX;
      this.velocityX *= this.friction;
    }
  }
}

##Additional Effects

The project also includes a snowfall effect that creates a visually appealing atmosphere. This effect is implemented in the initsnow() and movesnow() functions, and it includes the sound effect of "Holly Jolly Christmas."

##Contact

If you have any questions or comments, feel free to contact us:

Author: Eghishe Manukyan
Email: manukyaneghishe@gmail.com
