import {startDrawingByFps} from './utils';

const ww = window.innerWidth;
const wh = window.innerHeight;

const posterCanvasDom = document.getElementById(`result-canvas`);
const ctx = posterCanvasDom.getContext(`2d`);

const elastic = (timeFraction) => Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * 1.5 / 3 * timeFraction);

const degreesToRadians = (degrees) => (degrees * Math.PI / 180);

const rotateCtx = (angle = 0, cx = 0, cy = 0) => {
  ctx.translate(cx, cy);
  ctx.rotate(degreesToRadians(angle));
  ctx.translate(-cx, -cy);
};

const scaleCtx = (x = 1, y = 1, cx = 0, cy = 0) => {
  ctx.translate(cx, cy);
  ctx.scale(x, y);
  ctx.translate(-cx, -cy);
};

const skewCtx = (x, y) => {
  ctx.transform(1, x, y, 1, 0, 0);
};

class Poster {
  constructor({src, width = 400, height = 300, x = 0, y = 0}) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.cx = this.x + this.width / 2;
    this.cy = this.y + this.height / 2;
    this.imgDom = new Image();
    this.imgDom.src = src;
  }

  draw() {
    ctx.drawImage(this.imgDom, this.x, this.y, this.width, this.height);
  }
}

const warlus = new Poster({
  src: `/img/warlus-animation/sea-calf-2.png`,
  width: 400,
  height: 400,
  x: (ww - 400) / 2,
  y: (wh - 400) / 1.5,
});

const ice = new Poster({
  src: `/img/warlus-animation/ice.png`,
  width: 360,
  height: 140,
  x: (ww - 360) / 1.95,
  y: (wh - 140) / 1.45,
});

const snowflake1 = new Poster({
  src: `/img/warlus-animation/snowflake.png`,
  width: 170,
  height: 170,
  x: (ww - 170) / 2.85,
  y: (wh - 170) / 1.9,
});

const snowflake2 = new Poster({
  src: `/img/warlus-animation/snowflake.png`,
  width: 130,
  height: 130,
  x: (ww - 130) / 1.53,
  y: (wh - 130) / 1.6,
});

const tree = new Poster({
  src: `/img/warlus-animation/tree.png`,
  width: 30,
  height: 80,
  x: (ww - 10) / 1.75,
  y: (wh - 100) / 1.75,
});

const tree2 = new Poster({
  src: `/img/warlus-animation/tree 2.png`,
  width: 35,
  height: 110,
  x: (ww - 10) / 1.825,
  y: (wh - 100) / 1.905,
});

const back = new Poster({
  src: `/img/warlus-animation/back.png`,
  width: 200,
  height: 100,
  x: (ww - 200) / 2,
  y: (wh - 100) / 2,
});

class WarlusAnimation {
  constructor() {
    this.frame = 0;

    posterCanvasDom.width = ww;
    posterCanvasDom.height = wh;
  }

  getProgress({start = 0, end}) {
    const value = (this.frame - start) / (end - start);
    switch (true) {
      case (value <= 0):
        return 0;
      case (value >= 1):
        return 1;
      default:
        return value;
    }
  }

  start() {
    startDrawingByFps(() => {
      posterCanvasDom.width = ww;
      posterCanvasDom.height = wh;

      const warlusTranslateYProgress = this.getProgress({end: 150});
      const warlusRotateProgress = this.getProgress({start: 10, end: 180});
      const warlusTranslateY = 120 * elastic(1 - warlusTranslateYProgress);
      const warlusAngle = 25 * elastic(1 - warlusRotateProgress);

      const b = {
        opacity: this.frame,
        centerX: back.cx,
        centerY: back.cy,
        radius: 15 * this.farme,
      };
      const angle = 40 + 120 * this.getProgress({end: 500});
      const s = 0.5;
      ctx.save();
      ctx.globalAlpha = b.opacity;
      ctx.fillStyle = `#acc3ff`;
      ctx.beginPath();
      ctx.arc(
          100,
          100,
          100,
          0,
          2 * Math.PI
      );
      ctx.moveTo(100, 0);
      ctx.bezierCurveTo(
          200,
          0,
          240,
          40,
          300,
          100
      );
      ctx.bezierCurveTo(
          200,
          200,
          200,
          200,
          100,
          200
      );
      // ctx.bezierCurveTo(
      //     (b.endX - b.deltasLength * Math.sin(angle)) * s,
      //     (b.endY + b.deltasLength * Math.cos(angle)) * s,
      //     (b.centerX + 10) * s,
      //     (b.centerY + b.radius) * s,
      //     b.centerX * s,
      //     (b.centerY + b.radius) * s
      // );
      ctx.fill();
      // back.draw();

      ctx.restore();
      ctx.save();
      if (this.frame >= 25) {
        tree.draw();
      }
      const tree2Progress = this.getProgress({start: 25, end: 50});
      ctx.globalAlpha = tree2Progress;
      scaleCtx(1, tree2Progress, 0, tree2.y + tree2.height);
      tree2.draw();

      ctx.restore();
      ctx.save();
      ctx.translate(0, warlusTranslateY);
      rotateCtx(warlusAngle, warlus.cx, warlus.cy);
      ice.draw();
      warlus.draw();

      ctx.restore();
      ctx.save();
      ctx.globalAlpha = this.getProgress({end: 50});
      ctx.translate(0, Math.cos(degreesToRadians(2.5 * this.frame)) * 8);
      rotateCtx(-20, snowflake1.cx, snowflake1.cy);
      snowflake1.draw();

      ctx.restore();
      ctx.save();
      ctx.globalAlpha = this.getProgress({start: 15, end: 50});
      ctx.translate(0, Math.sin(degreesToRadians(2.5 * this.frame)) * 5);
      rotateCtx(180, snowflake2.cx, snowflake2.cy);
      snowflake2.draw();

      this.frame += 1;
    }, 60);
  }
}

export default new WarlusAnimation();
