import loadScript from "./loadScript.js";

function observerMap() {
    window.observerMap = (mapID, src) => {

        // Проверяем, существует ли элемент с указанным mapID
        const targetElement = document.getElementById(mapID);
        if (!targetElement) {
            console.error(`Element with ID ${mapID} not found.`);
            return;
        }

        // Создаем новый IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadScript(src, targetElement)
                        .then(() => {
                            // Добавляем класс и прекращаем наблюдение за элементом
                            targetElement.classList.add('loader-hide');
                            observer.unobserve(entry.target);
                        })
                        .catch(error => {
                            console.error('Error loading script:', error);
                        });
                }
            });
        });

        // Начинаем наблюдение за элементом
        observer.observe(targetElement);
    }
}

export default observerMap;