export const startDrawingByFps = (callback, fps) => {
  const fpsInterval = 1000 / fps;
  let now;
  let elapsed;
  let then = Date.now();
  let stopCondition = () => false;
  const draw = () => {
    if (!stopCondition()) {
      requestAnimationFrame(draw);
    }
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
      then = now - (elapsed % fpsInterval);
      const callbackReturn = callback();
      if (typeof callbackReturn === `function`) {
        stopCondition = callbackReturn;
      }
    }
  };
  requestAnimationFrame(draw);
};
