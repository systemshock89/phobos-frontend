/**
 * https://github.com/verlok/vanilla-lazyload
 */

import LazyLoad from "vanilla-lazyload";

function lazyLoad(){
    // with use_native
    const lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy",
        use_native: true,
    });

    // without use_native (false)
    const lazyLoadInstance2 = new LazyLoad({
        elements_selector: ".section_bg, .img-container-bg, .slider__img-container, .slider-bg__wrapper, .slider-bg-fw__item, .cta2__img"
    });
}
export default lazyLoad;