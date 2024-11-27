const textClamp = () => {
    // Выбираем все элементы с классом 'text-clamp'
    document.querySelectorAll('.text-clamp').forEach(element => {
        if (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth) {
            const readMoreButton = document.createElement("button");
            readMoreButton.innerText = 'Показать еще...';
            readMoreButton.classList.add("readMoreButton");

            readMoreButton.addEventListener('click', (event) => {
                event.preventDefault();
                element.classList.remove('text-clamp');
                readMoreButton.remove();
            });

            // Проверяем, не существует ли уже кнопка рядом
            const nextSibling = element.nextElementSibling;
            if (!nextSibling || (nextSibling && !nextSibling.classList.contains('readMoreButton'))) {
                element.insertAdjacentElement('afterend', readMoreButton);
            }
        }
    });
};

export default textClamp;
