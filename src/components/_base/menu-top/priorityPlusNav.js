/**
 * https://github.com/jayfreestone/priority-plus
 */

import priorityPlus from "priority-plus";

const priorityPlusNav = (blockName) => {
    if (window.isMobile) return;

    try {
        const menuSelector = `.${blockName}_list`;
        const menuElement = document.querySelector(menuSelector);

        if (!menuElement) return;

        const priorityPlusMenu = priorityPlus(menuElement, {
            classNames: {
                'toggle-btn': [`${blockName}__link ${blockName}__link_more p-plus__toggle-btn`],
                'overflow-nav': [`${blockName}__submenu ${blockName}__submenu_level1 ${blockName}__submenu_more`],
            },
            innerToggleTemplate: 'Еще...',
        });

        const updateMenuClasses = () => {
            // Update submenu item classes
            document.querySelectorAll(`.${blockName}__submenu_more li`).forEach(li => {
                li.classList.replace(`${blockName}_item`, `${blockName}__submenu-item`);

                const link = li.querySelector('a');
                link?.classList.replace(`${blockName}__link`, `${blockName}__submenu-link`);
            });

            // Update menu item classes
            document.querySelectorAll(`.${blockName}_list > .${blockName}__submenu-item`).forEach(li => {
                li.classList.replace(`${blockName}__submenu-item`, `${blockName}_item`);

                const link = li.querySelector('a');
                link?.classList.replace(`${blockName}__submenu-link`, `${blockName}__link`);
            });
        };

        const setMenuVisibility = () => {
            setTimeout(() => {
                if (blockName === 'menu-header') {
                    document.querySelector('.header__desktop-top-grid')?.classList.add('header__desktop-top-grid_visible');
                }

                if (blockName === 'menu-top') {
                    document.querySelector(`.${blockName}`)?.classList.add(`${blockName}_visible`);
                }
            }, 100);
        };

        priorityPlusMenu.on('itemsChanged', updateMenuClasses);
        priorityPlusMenu.on('toggleClicked', updateMenuClasses);
        setMenuVisibility();
    } catch (error) {
        console.error('priorityPlusNav error:', error);
    }
};

export default priorityPlusNav;