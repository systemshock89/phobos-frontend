import debounce from "../../../js/modules/debounce.js";

// import Mmenu from "mmenu-js"; // full

//	Core
import Mmenu from 'mmenu-js/dist/core/oncanvas/mmenu.oncanvas.js';

//	Core add-ons
import offcanvas from 'mmenu-js/dist/core/offcanvas/mmenu.offcanvas.js';
import scrollBugFix from 'mmenu-js/dist/core/scrollbugfix/mmenu.scrollbugfix.js';
import theme from 'mmenu-js/dist/core/theme/mmenu.theme.js';

//	Add-ons
import navbars from 'mmenu-js/dist/addons/navbars/mmenu.navbars.js';

Mmenu.addons = {
    //	Core add-ons
    offcanvas,
    scrollBugFix,
    theme,

    //	Add-ons
    // backButton,
    // counters,
    // iconbar,
    // iconPanels,
    navbars,
    // pageScroll,
    // searchfield,
    // sectionIndexer,
    // setSelected,
    // sidebar
};

if (window) {
    window.Mmenu = Mmenu;
}

const debouncedCloneDesktopMenu = debounce(cloneDesktopMenu, 200);

function mmenu(){
    window.addEventListener('resize', debouncedCloneDesktopMenu);
    cloneDesktopMenu();

    if(window.isMobile){
        mmenuInit();
    }
}

// на десктопе клонируем верхнее меню, удалив из него все лишние классы
function cloneDesktopMenu() {
    if (!window.isMobile && window.innerWidth <= 991) {
        const menuDesktop = document.querySelectorAll('.menu-top_list');
        if (menuDesktop.length) {
            const lastMenuDesktop = menuDesktop[menuDesktop.length - 1]; // из-за priorityPlus элементов menu-top_list несколько. выберем последний
            const menuDesktopWithoutClasses = removeAllClasses(lastMenuDesktop);

            menuDesktopWithoutClasses.id = 'mmenu';
            document.querySelector('#panel-menu').append(menuDesktopWithoutClasses);

            window.removeEventListener("resize", debouncedCloneDesktopMenu);
            mmenuInit();
        }
    }
}

function mmenuInit(){
    window.menu = new Mmenu("#mmenu", {
        // const menu = new Mmenu( "#mmenu", {
        theme: "dark",
        slidingSubmenus: false, // открывать подменю снизу / в виде скользящих меню
        navbar: false, // убрать сверху название меню
        navbars: [
            {
                position: "top",
                content: Array.from(document.querySelector("#mmenu-top-buttons").children)
            },
            {
                position: "top",
                content: document.querySelector(".header__descr")
            },
            // {
            //     "position": "top",
            //     "type": "tabs",
            //     "content": Array.from(document.querySelector("#mmenu-tabs").children)
            // },
            {
                use: Boolean(document.querySelector(".socials_mobile")),
                position: "bottom",
                content: Array.from(document.querySelector(".socials_mobile")?.children || [])
            },
        ],
        // "counters": true, // кол-во подразделов
        // setSelected: {
        //     hover: true // чтобы пункт меню был активным при наведении мышью (например, для десктопа).
        // },
    }, {
        classNames: {
            selected: document.querySelector("body.item") ? "active": "selected",
        },
        offCanvas: {
            page: {
                selector: ".page"
            },
        },
        language: "ru",
    });
}

function removeAllClasses(element) {
    if (!element || !element.nodeType || element.nodeName === "svg") {
        return null; // Возвращаем null, если элемент не существует или не является узлом DOM
    }

    const newElement = element.cloneNode(false); // Клонируем элемент без копирования его детей

    // Удаляем классы у текущего элемента
    if (["UL", "LI", "A", "SPAN"].includes(newElement.nodeName)) {
        if (newElement.classList.contains('menu-top_item_selected') || newElement.classList.contains('menu-top__submenu-item_selected')) {
            newElement.className = 'selected';
        } else if (newElement.classList.contains('menu-top_item_active') || newElement.classList.contains('menu-top__submenu-item_active')) {
            newElement.className = 'active';
        } else {
            newElement.className = '';
        }
    }

    // Рекурсивно обходим дочерние элементы текущего элемента и добавляем их к новому элементу без классов
    Array.from(element.childNodes).forEach(child => {
        const newChild = removeAllClasses(child);
        if (newChild) {
            newElement.appendChild(newChild);
        }
    });

    return newElement; // Возвращаем новый элемент без классов
}

export default mmenu;