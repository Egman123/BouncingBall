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


##Additional Effects

The project also includes a snowfall effect that creates a visually appealing atmosphere. This effect is implemented in the initsnow() and movesnow() functions, and it includes the sound effect of "Holly Jolly Christmas."

##Contact

If you have any questions or comments, feel free to contact us:

Author: Eghishe Manukyan
Email: manukyaneghishe@gmail.com
