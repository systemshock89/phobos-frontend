const tableArrows = (tableResponsiveSelector = '.table-responsive') => {
    document.querySelectorAll(tableResponsiveSelector).forEach(tableResponsive => {
        const tableOverflow = tableResponsive.querySelector('.overflow');
        const table = tableOverflow.querySelector('table');
        let tableResponsiveArrowRightFlag = table.offsetWidth > tableOverflow.offsetWidth;

        // Добавление стрелок
        tableResponsive.insertAdjacentHTML('afterbegin', `
            <button class="table-responsive__arrow table-responsive__arrow_left" aria-label="Прокрутить влево">
                <svg><use xlink:href="img/sprite.svg#arrow-left"></use></svg>
            </button>
            <button class="table-responsive__arrow table-responsive__arrow_right" aria-label="Прокрутить вправо">
                <svg><use xlink:href="img/sprite.svg#arrow-left"></use></svg>
            </button>
        `);

        // Обработчик изменения размера окна
        const handleResize = () => {
            tableResponsiveArrowRightFlag = table.offsetWidth > tableOverflow.offsetWidth;
            updateArrowVisibility();
        };

        // Обработчик прокрутки
        const handleScroll = () => {
            tableResponsive.classList.toggle('table-responsive__arrow_left-on', tableOverflow.scrollLeft > 0);
            tableResponsive.classList.toggle('table-responsive__arrow_right-on', tableResponsiveArrowRightFlag && (tableOverflow.scrollLeft + tableOverflow.offsetWidth < table.offsetWidth));
        };

        // Обновление видимости стрелок
        const updateArrowVisibility = () => {
            tableResponsive.classList.toggle('table-responsive__arrow_right-on', tableResponsiveArrowRightFlag);
        };

        // Добавление обработчиков событий
        window.addEventListener('resize', handleResize);
        tableOverflow.addEventListener('scroll', handleScroll);

        // Обработчики кликов на стрелки
        tableResponsive.querySelector('.table-responsive__arrow_left').addEventListener('click', () => {
            tableOverflow.scrollBy({ left: -100, behavior: 'smooth' });
        });

        tableResponsive.querySelector('.table-responsive__arrow_right').addEventListener('click', () => {
            tableOverflow.scrollBy({ left: 100, behavior: 'smooth' });
        });

        // Инициализация видимости стрелок
        updateArrowVisibility();
        handleScroll();
    });
};

export default tableArrows;
