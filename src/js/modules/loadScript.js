// Функция для асинхронной загрузки js скрипта
const loadScript = async (src, container = document.head) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;  // Устанавливаем асинхронную загрузку скрипта
        script.onload = () => resolve(script);  // Разрешаем промис после успешной загрузки
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));  // Отклоняем промис при ошибке
        container.appendChild(script);  // Добавляем скрипт в container
    });
};

export default loadScript;