// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import onLoad from './modules/onload';
import AccentTypographyBuild from './modules/accent-typography-build';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
onLoad();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const introTitleAnimation = new AccentTypographyBuild({
  element: document.querySelector(`.intro__title`),
  wordDelay: 500
});
setTimeout(()=>{
  introTitleAnimation.runAnimation();
}, 500);

const introDateAnimation = new AccentTypographyBuild({
  element: document.querySelector(`.intro__date`)
});
setTimeout(()=>{
  introDateAnimation.runAnimation();
}, 1250);
