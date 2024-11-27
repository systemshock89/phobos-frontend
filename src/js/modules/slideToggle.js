/* plain JS slideToggle https://github.com/ericbutler555/plain-js-slidetoggle */

function slideToggle(duration = 400, callback) {
  const isDown = this.clientHeight === 0;
  this.style.overflow = "hidden";
  if (isDown) this.style.display = "block";

  const elStyles = window.getComputedStyle(this);
  const elHeight = parseFloat(elStyles.getPropertyValue('height'));
  const elPaddingTop = parseFloat(elStyles.getPropertyValue('padding-top'));
  const elPaddingBottom = parseFloat(elStyles.getPropertyValue('padding-bottom'));
  const elMarginTop = parseFloat(elStyles.getPropertyValue('margin-top'));
  const elMarginBottom = parseFloat(elStyles.getPropertyValue('margin-bottom'));

  const stepHeight = elHeight / duration;
  const stepPaddingTop = elPaddingTop / duration;
  const stepPaddingBottom = elPaddingBottom / duration;
  const stepMarginTop = elMarginTop / duration;
  const stepMarginBottom = elMarginBottom / duration;

  let start;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;

    if (isDown) {
      this.style.height = (stepHeight * elapsed) + "px";
      this.style.paddingTop = (stepPaddingTop * elapsed) + "px";
      this.style.paddingBottom = (stepPaddingBottom * elapsed) + "px";
      this.style.marginTop = (stepMarginTop * elapsed) + "px";
      this.style.marginBottom = (stepMarginBottom * elapsed) + "px";
    } else {
      this.style.height = elHeight - (stepHeight * elapsed) + "px";
      this.style.paddingTop = elPaddingTop - (stepPaddingTop * elapsed) + "px";
      this.style.paddingBottom = elPaddingBottom - (stepPaddingBottom * elapsed) + "px";
      this.style.marginTop = elMarginTop - (stepMarginTop * elapsed) + "px";
      this.style.marginBottom = elMarginBottom - (stepMarginBottom * elapsed) + "px";
    }

    if (elapsed >= duration) {
      this.style.height = "";
      this.style.paddingTop = "";
      this.style.paddingBottom = "";
      this.style.marginTop = "";
      this.style.marginBottom = "";
      this.style.overflow = "";
      if (!isDown) this.style.display = "none";
      if (typeof callback === 'function') callback();
    } else {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

// Добавляем метод в прототип HTMLElement
HTMLElement.prototype.slideToggle = slideToggle;

export default slideToggle;
