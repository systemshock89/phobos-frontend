const blockBgToggle = (blockClass) => {
    const block = document.querySelector(`.${blockClass}`);

    if (block && !window.isMobile) {
        const bgToggle = () => {
            if(blockClass === 'menu-top'){
                block.classList.toggle(`${blockClass}_bg-transparent`, window.scrollY < 93);
            } else {
                block.classList.toggle(`${blockClass}_bg-transparent`, window.scrollY === 0);
            }
        };

        // Изначально вызываем функции
        bgToggle();

        // Обработчик события scroll с использованием requestAnimationFrame для производительности
        let isScrolling = false;
        const onScroll = () => {
            if (!isScrolling) {
                isScrolling = true;
                requestAnimationFrame(() => {
                    bgToggle();
                    isScrolling = false;
                });
            }
        };

        document.addEventListener('scroll', onScroll);
    }
};

export default blockBgToggle;