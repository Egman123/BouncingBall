const balls: BouncingBall[] = [];

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas?.getContext("2d");

let lastTime: number = 0;
let animationId: number;
let Debug: boolean = false;
const btn: HTMLButtonElement | null = document.getElementById(
  "btn"
) as HTMLButtonElement | null;

const audio: HTMLAudioElement = new Audio(
  "Michael Buble - Holly Jolly Christmas.mp3"
);

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

const tick = (currentTime: number): void => {
  animationId = requestAnimationFrame(tick);

  const deltaTime = currentTime - lastTime;
  drawCanvas(deltaTime);
  lastTime = currentTime;

  if (balls.length >= 15 && balls.every((ball) => ball.res > -0.5)) {
    cancelAnimationFrame(animationId);
  }
};

const init = (): void => {
  if (!canvas || !context) return;

  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.addEventListener("click", clickHandler);

  requestAnimationFrame(tick);
};

const clickHandler = (e: MouseEvent): void => {
  audio.play();
  if (balls.length <= 15) balls.push(new BouncingBall(e.x, e.y));
};

const drawCanvas = (deltaTime: number): void => {
  if (!canvas || !context) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.drawBall();
    ball.moveBall(deltaTime);
    if (Debug) ball.drawBallText();
  });
};

const randomNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

init();

if (btn) {
  btn.addEventListener("click", () => {
    Debug = !Debug;
    if (Debug) btn.innerHTML = "Off Coord";
    else btn.innerHTML = "Onn Coord";
  });
}













// Something extra for interest
// Snow
var myAudio = new Audio("Michael Buble - Holly Jolly Christmas.mp3");
const snowmax = 35;
const snowcolor = [
  "#AAAACC",
  "#DDDDFF",
  "#CCCCDD",
  "#F3F3F3",
  "#F0FFFF",
  "#FFFFFF",
  "#EFF5FF",
];
const snowtype = ["Arial Black", "Arial Narrow", "Times", "Comic Sans MS"];
const snowletter = "*";
const sinkspeed = 0.6;
const snowmaxsize = 40;
const snowminsize = 8;
const snowingzone = 1;

const snow = [];
let marginbottom;
let marginright;
let i_snow = 0;
const x_mv = [];
const crds = [];
const lftrght = [];
const browserinfos = navigator.userAgent;
const ie5 =
  document.all && document.getElementById && !browserinfos.match(/Opera/);
const ns6 = document.getElementById && !document.all;
const opera = browserinfos.match(/Opera/);
const browserok = ie5 || ns6 || opera;

function randommaker(range) {
  const rand = Math.floor(range * Math.random());
  return rand;
}

function initsnow() {
  if (ie5 || opera) {
    marginbottom = document.body.clientHeight;
    marginright = document.body.clientWidth;
  } else if (ns6) {
    marginbottom = window.innerHeight;
    marginright = window.innerWidth;
  }
  const snowsizerange = snowmaxsize - snowminsize;
  for (let i = 0; i <= snowmax; i++) {
    crds[i] = 0;
    lftrght[i] = Math.random() * 15;
    x_mv[i] = 0.03 + Math.random() / 10;
    snow[i] = createSnowElement();
    snow[i].style.fontFamily = snowtype[randommaker(snowtype.length)];
    snow[i].size = randommaker(snowsizerange) + snowminsize;
    snow[i].style.fontSize = snow[i].size + "px";
    snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
    snow[i].sink = (sinkspeed * snow[i].size) / 5;
    if (snowingzone === 1) {
      snow[i].posx = randommaker(marginright - snow[i].size);
    }
    if (snowingzone === 2) {
      snow[i].posx = randommaker(marginright / 2 - snow[i].size);
    }
    if (snowingzone === 3) {
      snow[i].posx =
        randommaker(marginright / 2 - snow[i].size) + marginright / 4;
    }
    if (snowingzone === 4) {
      snow[i].posx =
        randommaker(marginright / 2 - snow[i].size) + marginright / 2;
    }
    snow[i].posy = randommaker(
      2 * marginbottom - marginbottom - 2 * snow[i].size
    );
    snow[i].style.left = snow[i].posx + "px";
    snow[i].style.top = snow[i].posy + "px";
  }
  movesnow();
}

function createSnowElement() {
  const snowElement = document.createElement("span");
  snowElement.style.position = "absolute";
  snowElement.style.top = `-${snowmaxsize}px`;
  snowElement.innerHTML = snowletter;
  document.body.appendChild(snowElement);
  return snowElement;
}

function movesnow() {
  for (let i = 0; i <= snowmax; i++) {
    crds[i] += x_mv[i];
    snow[i].posy += snow[i].sink;
    snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
    snow[i].style.top = snow[i].posy + "px";
    if (
      snow[i].posy >= marginbottom - 2 * snow[i].size ||
      parseInt(snow[i].style.left) > marginright - 3 * lftrght[i]
    ) {
      if (snowingzone === 1) {
        snow[i].posx = randommaker(marginright - snow[i].size);
      }
      if (snowingzone === 2) {
        snow[i].posx = randommaker(marginright / 2 - snow[i].size);
      }
      if (snowingzone === 3) {
        snow[i].posx =
          randommaker(marginright / 2 - snow[i].size) + marginright / 4;
      }
      if (snowingzone === 4) {
        snow[i].posx =
          randommaker(marginright / 2 - snow[i].size) + marginright / 2;
      }
      snow[i].posy = 0;
    }
  }
  const timer = setTimeout(movesnow, 50);
}

if (browserok) {
  window.onload = initsnow;
}
