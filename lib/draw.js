let nyan1 = document.getElementById('nyan-1');
let nyan2 = document.getElementById('nyan-2');
let nyan3 = document.getElementById('nyan-3');
let nyan4 = document.getElementById('nyan-4');
let nyan5 = document.getElementById('nyan-5');
let nyan6 = document.getElementById('nyan-6');
let nyan7 = document.getElementById('nyan-7');
let nyan8 = document.getElementById('nyan-8');
let nyan9 = document.getElementById('nyan-9');
let nyan10 = document.getElementById('nyan-10');
let nyan11 = document.getElementById('nyan-11');
let nyan12 = document.getElementById('nyan-12');
let nyanFrames = [nyan1, nyan2, nyan3, nyan4, nyan5, nyan6, nyan7, nyan8, nyan9, nyan10, nyan11, nyan12];
let frameCount = 0;
let lastFrameTime = 0;

class Draw {
  constructor() {}

  drawObject(object) {
    object.context.drawImage(object.image, object.x, object.y);
    return object;
  }

  drawCollection(collection) {
    for (let i = 0; i < collection.length; i++){
      this.drawObject(collection[i]);
    }
  }

  drawCat(cat) {
    let now = Date.now();
    let elapsed = (now - lastFrameTime);
    let frame = nyanFrames[frameCount];
    this.checkNewFrame(elapsed, now);
    cat.context.drawImage(frame, cat.x, cat.y);
    this.resetFrameCount();
  }

  checkNewFrame(elapsed, now) {
    if (elapsed > 75) {
      lastFrameTime = now;
      frameCount++;
    }
    return frameCount;
  }

  resetFrameCount() {
    if (frameCount === 12) {
      frameCount = 0;
    }
    return frameCount;
  }
}

module.exports = Draw;
