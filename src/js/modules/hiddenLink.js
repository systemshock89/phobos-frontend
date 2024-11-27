const hiddenLink = () => {
    document.querySelectorAll('.hidden-link').forEach(hiddenLink => {
        // Проверка на наличие необходимого атрибута
        const href = hiddenLink.dataset.link;
        if (href) {
            const link = document.createElement('a');
            link.href = href;
            link.target = '_blank';
            link.innerHTML = hiddenLink.innerHTML;
            hiddenLink.replaceWith(link);
        } else {
            console.warn('Data-link attribute is missing or empty for an element:', hiddenLink);
        }
    });
};

export default hiddenLink;