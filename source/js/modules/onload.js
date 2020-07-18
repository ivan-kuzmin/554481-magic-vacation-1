export default () => {
  document.body.onload = function () {
    document.body.classList.add(`loaded`);
  };

  const lastRuleItem = document.getElementsByClassName('rules__item')[3];
  const rulesLink = document.getElementsByClassName('rules__link')[0];
  lastRuleItem.children[0].onanimationend = function (e) {
    rulesLink.style.animationPlayState = 'running';
  }
};
