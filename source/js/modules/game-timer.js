const COUNTER_TIME = 5 * 60 * 1000;

const counterMin = document.getElementById(`counterMin`);
const counterSec = document.getElementById(`counterSec`);

class GameTimer {
  constructor() {
    this.startTime = 0;
    this.draw = this.draw.bind(this);
  }

  draw() {
    const restTime = (COUNTER_TIME - (new Date() - this.startTime)) / 1000;
    const restMin = Math.floor(restTime / 60);
    const restSec = Math.floor(restTime % 60);
    const restMinText = restMin.toString().padStart(2, `0`);
    const restSecText = restSec.toString().padStart(2, `0`);
    if (counterMin.textContent !== restMinText) {
      counterMin.textContent = restMinText;
    }
    if (counterSec.textContent !== restSecText) {
      counterSec.textContent = restSecText;
    }
    if (restMin > 0 || restSec > 0) {
      requestAnimationFrame(this.draw);
    } else {
      counterMin.textContent = `00`;
      counterSec.textContent = `00`;
    }
  }

  start() {
    if (!this.startTime) {
      this.startTime = new Date();
      requestAnimationFrame(this.draw);
    }
  }

  stop() {
    this.startTime = 0;
  }

  restart() {
    this.stop();
    this.start();
  }
}

export default new GameTimer();
