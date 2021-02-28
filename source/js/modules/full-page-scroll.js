import throttle from 'lodash/throttle';

const journeys = document.getElementById(`journeys`);
const journeysAnimation = document.getElementById(`journeysAnimation`);

const cases = document.getElementById(`cases`);
const casesAnimation = document.getElementById(`casesAnimation`);
const casesCount = document.getElementById(`casesCount`);

const codes = document.getElementById(`codes`);
const codesAnimation = document.getElementById(`codesAnimation`);
const codesCount = document.getElementById(`codesCount`);

const startPrizesCounter = ({element, start, end, step}) => {
  let frame = 0;
  let count = start;
  const draw = () => {
    if (frame % 12 === 0) {
      element.textContent = count;
      count += step;
    }
    frame++;
    if (count < end) {
      window.requestAnimationFrame(draw);
    } else {
      count = end;
      element.textContent = count;
    }
  };
  window.requestAnimationFrame(draw);
};

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 2000;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);

    this.animationHasBeenStarted = false;
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    const currentPosition = this.activeScreen;
    this.reCalculateActiveScreenPosition(evt.deltaY);
    if (currentPosition !== this.activeScreen) {
      this.changePageDisplay();
    }
  }

  onUrlHashChanged() {
    this.lastScreen = this.activeScreen;
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    if (this.lastScreen === 3) {
      const rulesLink = document.getElementsByClassName(`rules__link`)[0];
      rulesLink.style.animationPlayState = `paused`;
    }
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
  }

  changeVisibilityDisplay() {
    clearTimeout(this.screenTimeout);
    const delay = this.lastScreen === 1 && this.activeScreen === 2 ? 600 : 0;
    this.screenElements.forEach((screen) => {
      screen.classList.remove(`screen--hidden-animation`);
      screen.classList.add(`screen--hidden`);
      screen.classList.remove(`active`);
    });
    if (delay) {
      this.screenElements[this.lastScreen].classList.remove(`screen--hidden`);
      this.screenElements[this.lastScreen].classList.add(`screen--hidden-animation`);
    }
    this.screenTimeout = setTimeout(() => {
      if (delay) {
        this.screenElements[this.lastScreen].classList.remove(`screen--hidden-animation`);
        this.screenElements[this.lastScreen].classList.add(`screen--hidden`);
      }
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, delay);
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      if (activeItem.getAttribute(`data-href`) === `prizes` && !this.animationHasBeenStarted) {
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
          startPrizesCounter({element: casesCount, start: 1, end: 7, step: 1});
        }, 4000);
        window.setTimeout(() => {
          codes.classList.remove(`prizes__item--hide-icon`);
          codesAnimation.beginElement();
        }, 6000);
        window.setTimeout(() => {
          codes.classList.remove(`prizes__item--hide-desc`);
          startPrizesCounter({element: codesCount, start: 11, end: 900, step: 117});
        }, 6500);
      }
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
