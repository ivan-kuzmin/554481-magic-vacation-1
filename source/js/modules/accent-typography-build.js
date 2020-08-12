export default class AccentTypographyBuild {
  constructor(params) {
    this._duration = params.duration || 500;
    this._delay = params.delay || 0;
    this._wordDelay = params.wordDelay || 0;
    this._element = params.element;

    this.prePareText();
  }

  createElement(letter, letterIndex, wordIndex) {
    const span = document.createElement(`span`);
    span.textContent = letter;
    span.style.margin = `0 -0.02em`;
    span.style.display = `inline-block`;
    span.style.opacity = 0;
    span.style.transform = `translate3d(0, 100%, 0)`;
    span.style.transitionProperty = `transform, opacity`;
    span.style.transitionDuration = `${this._duration}ms`;
    span.style.transitionTimingFunction = `ease`;
    span.style.transitionDelay = `${(3 - letterIndex % 3) * this._delay + wordIndex * this._wordDelay}ms`;
    return span;
  }

  prePareText() {
    if (!this._element) {
      return;
    }
    const text = this._element.textContent.trim().split(` `).filter((latter) => latter !== ``);

    const content = text.reduce((fragmentParent, word, wordIndex) => {
      const wordElement = Array.from(word).reduce((fragment, latter, letterIndex) => {
        const letterContainer = this.createElement(latter, letterIndex, wordIndex);
        fragment.appendChild(letterContainer);
        return fragment;
      }, document.createDocumentFragment());
      const wordContainer = document.createElement(`span`);
      wordContainer.style.display = `inline-flex`;
      wordContainer.style.overflowY = `hidden`;
      wordContainer.style.letterSpacing = 0;
      wordContainer.style.padding = `0 0.02em`;
      if (wordIndex !== text.length - 1) {
        wordContainer.style.marginRight = `5px`;
      }
      wordContainer.appendChild(wordElement);
      fragmentParent.appendChild(wordContainer);
      return fragmentParent;
    }, document.createDocumentFragment());

    this._element.innerHTML = ``;
    this._element.appendChild(content);
  }

  runAnimation() {
    if (!this._element) {
      return;
    }
    this._element.childNodes.forEach((word) => {
      word.childNodes.forEach((letter) => {
        letter.style.transform = `translate3d(0, 20%, 0)`;
        letter.style.opacity = 1;
      });
    });
  }
}
