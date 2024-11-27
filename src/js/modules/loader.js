const showLoader = () => {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        preloader.classList.add('active');
    } else {
        console.warn('Element with ID "preloader" not found.');
    }
};

const hideLoader = () => {
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        preloader.classList.remove('active');
    } else {
        console.warn('Element with ID "preloader" not found.');
    }
};

// Экспортируем обе функции
export { showLoader, hideLoader };