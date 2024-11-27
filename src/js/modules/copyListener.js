function copyListenerFunc(){
    const handleCopy = (event) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return;

        const range = selection.getRangeAt(0);
        const rangeContents = range.cloneContents();
        const pageLink = `Подробнее: ${document.location.href}`;
        const helper = document.createElement('div');

        // Проверяем, что количество слов больше 10
        if (range.toString().split(' ').length < 10) return;

        helper.appendChild(rangeContents);
        const plainText = `${helper.innerText}\n${pageLink}`;
        const htmlText = `${helper.innerHTML}<br>${pageLink}`;

        // Устанавливаем данные в буфер обмена
        event.clipboardData.setData('text/plain', plainText);
        event.clipboardData.setData('text/html', htmlText);
        event.preventDefault();
    };

    document.addEventListener('copy', handleCopy);
}
export default copyListenerFunc;