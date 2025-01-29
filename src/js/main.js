'use strict';

// plugins
import mmenu from "../components/_base/header/mmenu.js";
import lazyLoad from "./modules/lazyload.js";
import fancybox from "./modules/fancybox.js";
import rutubeFbPlay from "../components/video/rutube-fb-play.js";

// my plugins
import initSubmitForm from "../components/forms/forms.js";

// main blocks
import headerContactsBtnHandle from "../components/_base/header/headerContactsBtnHandle.js";
import menuToggle from '../components/_base/menu-top/menuToggle.js';
import priorityPlusNav from "../components/_base/menu-top/priorityPlusNav.js";
import tagsInit from "../components/tags/tags.js";
import filterButtonToggle from "../components/_base/filter/filter.js";

// sliders
import slider from '../components/sliders/slider/slider.js';
import sliderSections from '../components/sliders/slider-sections/slider-sections.js';
import sliderSectionCarouselFunc from "../components/sliders/slider-carousel-section/slider-carousel-section.js";
import sliderForm from "../components/sliders/slider-form/slider-form.js";

// modules
import copyListenerFunc from "./modules/copyListener.js";
import anchor from "./modules/anchor.js";
import hiddenLink from "./modules/hiddenLink.js";
import tableArrows from "./modules/tableArrows.js";
import cookieWarning from "./modules/cookieWarning.js";
import scrollTop from "./modules/scrollTop.js";
import observerMap from "./modules/observerMap.js";
import contactsMap from "../components/contacts-where-buy/contactsMap.js";
import contactsListMap, {selectCity} from "../components/contacts-where-buy/contactsListMap.js";
import pagination from "../components/pagination/pagination.js";
import yaC from "./modules/yaC.js";

window.isMobile = document.body.classList.contains('is-mobile');

document.addEventListener('DOMContentLoaded', () => {

});

// plugins
mmenu();
lazyLoad();
fancybox();
rutubeFbPlay();

// my plugins
initSubmitForm();

// main blocks
headerContactsBtnHandle();
priorityPlusNav('menu-top');
menuToggle(); // submenu-toggle
tagsInit();
filterButtonToggle();

// sliders
slider();
sliderSections();
sliderSectionCarouselFunc();
sliderForm();

// modules
anchor();
hiddenLink(); // hidden link for seo
tableArrows();
cookieWarning();
scrollTop();
copyListenerFunc(); // add link to copied text
observerMap();
contactsMap();
contactsListMap(); // карта в "Где купить" со всеми объектами
selectCity();
// if (onAjaxPagination) pagination();
yaC(); // get Ya.Metrika id (for reachGoal)






