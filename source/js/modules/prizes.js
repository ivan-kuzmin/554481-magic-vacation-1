import {startDrawingByFps} from './utils';

const journeys = document.getElementById(`journeys`);
const journeysAnimation = document.getElementById(`journeysAnimation`);

const cases = document.getElementById(`cases`);
const casesAnimation = document.getElementById(`casesAnimation`);
const casesCount = document.getElementById(`casesCount`);

const codes = document.getElementById(`codes`);
const codesAnimation = document.getElementById(`codesAnimation`);
const codesCount = document.getElementById(`codesCount`);

const drawPrizesCount = ({element, start, end, step}) => {
  let count = start;
  startDrawingByFps(() => {
    count += step;
    const isCountValid = count >= end;
    element.textContent = isCountValid ? end : count;
    return () => isCountValid;
  }, 12);
};

class Prizes {
  constructor() {
    this.animationHasBeenStarted = false;
  }

  startAnimation() {
    if (!this.animationHasBeenStarted) {
      this.animationHasBeenStarted = true;
      journeysAnimation.beginElement();
      window.setTimeout(() => {
        journeys.classList.remove(`prizes__item--hide-desc`);
      }, 2500);
      window.setTimeout(() => {
        journeys.classList.remove(`prizes__item--translate`);
      }, 3500);
      window.setTimeout(() => {
        cases.classList.remove(`prizes__item--hidden`, `prizes__item--hide-desc`);
        casesAnimation.beginElement();
        drawPrizesCount({element: casesCount, start: 1, end: 7, step: 1});
      }, 4000);
      window.setTimeout(() => {
        codes.classList.remove(`prizes__item--hide-icon`);
        codesAnimation.beginElement();
      }, 6000);
      window.setTimeout(() => {
        codes.classList.remove(`prizes__item--hide-desc`);
        drawPrizesCount({element: codesCount, start: 11, end: 900, step: 117});
      }, 6500);
    }
  }
}

export default new Prizes();
