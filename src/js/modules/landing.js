function landing() {
    if (!document.body.classList.contains('landing')) return;

    menuItemsClick();

    window.addEventListener('scroll', highlightMenuItems);
}

// click on menuItems on Mmenu
function menuItemsClick(){
    const apiMenu = window.menu?.API;
    const menuItems = document.querySelectorAll('.mm-listitem__text');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            apiMenu?.close();
        });
    });
}

function highlightMenuItems() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        // Получаем позицию начала и конца блока section
        const sectionStart = section.offsetTop;
        const sectionEnd = sectionStart + section.offsetHeight;
        const offsetSection = parseInt(getComputedStyle(section).scrollMarginTop, 10);

        // Если текущая позиция скролла находится в пределах блока section,
        // выделяем пункты li в соответствующем меню
        // if (scrollPosition >= sectionStart && scrollPosition < sectionEnd) {
        // учтем offset, а также вычтем 1 для того чтобы отсечь десятые
        if (scrollPosition >= sectionStart - offsetSection - 1 && scrollPosition < sectionEnd) {
            const menuId = section.getAttribute('id') || section.parentElement.querySelector('.tpl-anchor')?.getAttribute('id');

            if (menuId) {
                const updateMenuItem = (selector, className) => {
                    const menu = document.querySelector(selector);
                    const menuList = menu?.closest('.menu-top_list');
                    if (menuList) {
                        menuList.querySelectorAll('.menu-top_item').forEach(item => item.classList.remove(className));
                        menu.parentElement.classList.add(className);
                    }

                    const menuMobile = document.querySelector(`.mm-menu [href="#${menuId}"]`);
                    const menuMobileItems = menuMobile?.closest('ul')?.querySelectorAll('li');
                    if (menuMobileItems) {
                        menuMobileItems.forEach(item => item.classList.remove(className.replace('item', 'listitem')));
                        menuMobile?.parentElement.classList.add(className.replace('item', 'listitem'));
                    }
                };

                updateMenuItem(`.menu-top__link[href="#${menuId}"]`, 'menu-top_item_selected');
            }
        }
    });
}

export default landing;
