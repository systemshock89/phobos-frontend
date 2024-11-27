// Функция для создания кнопки прокрутки вверх
const scrollTop = () => {
    // Создаем кнопку и задаем ей свойства
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<svg><use xlink:href="img/sprite.svg#chevron-up"></use></svg>';
    scrollBtn.classList.add('scrollTopBtn');
    scrollBtn.setAttribute('title', 'Наверх');
    document.body.appendChild(scrollBtn);

    // Функция для управления видимостью кнопки
    const updateButtonVisibility = () => {
        scrollBtn.classList.toggle('show', window.scrollY > 0);
    };

    // Обработчик события прокрутки
    window.addEventListener('scroll', updateButtonVisibility);

    // Функция для плавной прокрутки вверх
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Обработчик события клика на кнопку
    scrollBtn.addEventListener('click', scrollToTop);

    // Обновляем видимость кнопки при загрузке страницы
    updateButtonVisibility();
};

export default scrollTop;
