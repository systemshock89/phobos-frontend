function tagsInit(){
    const tags = function (tagsBlocks){
        tagsBlocks.forEach(tagsBlock => {
            const tags = tagsBlock.querySelectorAll('.tags__item:not(.tags__item_all)'); // выберем все элементы, кроме кнопки "показать еще"
            const buttonShowAll = tagsBlock.querySelector('.tags__item_all');
            const tagLastKey = tags.length - 1; // индекс последнего эл-та в массиве

            if(tags.length){
                tagsInit(tags, buttonShowAll);

                // если первый и последний тег находятся на разных высотах
                if(tags[0].offsetTop !== tags[tagLastKey].offsetTop){
                    // то покажем кнопку "показать еще"
                    buttonShowAll.classList.add('tags__item_show');

                    for (let i = tagLastKey; i >= 0; i--) {
                        const minOffset = tags[0].offsetTop; // отступ у первого элемента
                        const buttonShowAllOffset = buttonShowAll.offsetTop; // отступ у кнопки

                        if( (buttonShowAllOffset !== minOffset && window.outerWidth > 768) // десктопы: все элементы на одной строчке
                            || (buttonShowAllOffset - minOffset > (40 + 10 + 40 + 10) && window.outerWidth <= 768) // мобильник: возможны три строки
                        ){
                            tags[i].classList.add('tags__item_hide');
                        }
                    }
                }

                setTimeout(function () {
                    tagsBlock.classList.add(`tags__wrapper_visible`);
                }, 100);

                // клик
                buttonShowAll.addEventListener('click', (event) => {
                    event.preventDefault();
                    tagsInit(tags, buttonShowAll);
                });
            }
        });

        function tagsInit(tags, buttonShowAll){
            // вначале покажем все элементы
            tags.forEach(tag => tag.classList.remove('tags__item_hide'));
            // и скроем кнопку
            buttonShowAll.classList.remove('tags__item_show');
        }
    }
    const tagsBlocks = document.querySelectorAll('.tags__wrapper');
    if(tagsBlocks.length){
        tags(tagsBlocks);
        addEventListener("resize", resizeThrottler, false);
        let resizeTimeout;
        function resizeThrottler() {
            // ignore resize events as long as an tags execution is in the queue
            if ( !resizeTimeout ) {
                resizeTimeout = setTimeout(function() {
                    resizeTimeout = null;
                    tags(tagsBlocks);

                    // The tags will execute at a rate of 15fps
                }, 66);
            }
        }
    }
}

export default tagsInit;