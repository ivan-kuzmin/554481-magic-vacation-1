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
    span.style.transitionDuration = `${this._duration}ms`;
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
      wordContainer.classList.add(`accent-typography`);
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
      word.classList.add(`accent-typography--active`);
    });
  }
}
