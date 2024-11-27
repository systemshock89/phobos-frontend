'use strict';

// plugins
import lazyLoad from "./modules/lazyload.js";
import fancybox from "./modules/fancybox.js";
import rutubeFbPlay from "../components/video/rutube-fb-play.js";

// my plugins
import initSubmitForm from "../components/forms/forms.js";

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
lazyLoad();
fancybox();
rutubeFbPlay();

// my plugins
initSubmitForm();

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
if (onAjaxPagination) pagination();
yaC(); // get Ya.Metrika id (for reachGoal)






