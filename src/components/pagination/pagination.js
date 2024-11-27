/**
 * https://docs.infiniteajaxscroll.com/getting-started
 * https://github.com/webcreate/infinite-ajax-scroll
 */

import InfiniteAjaxScroll from '@webcreate/infinite-ajax-scroll';

const pagination = () => {
    window.pagination = ({subClassId, disableBlockMarkup, disableBlockListMarkup, paginationAllValue, nextLink, curPos2, numberOfPages}) => {
        const blockMarkupClass = disableBlockMarkup || disableBlockListMarkup || (disableBlockMarkup === undefined && disableBlockListMarkup === undefined)
            ? "" : " > .tpl-block-list-objects";

        const ias = new InfiniteAjaxScroll(`.infoblock-id-${subClassId} .pagination-ajax-wrapper ${blockMarkupClass}`, {
            item: `.infoblock-id-${subClassId} .pagination-ajax-wrapper ${blockMarkupClass} > *:not(.pagination-ajax-item-excluded)`,
            next: `.infoblock-id-${subClassId} .next`,
            pagination: `.infoblock-id-${subClassId} .pagination-ajax`,
            spinner: `.infoblock-id-${subClassId} .pagination-ajax-loader`,
            logger: false,
            trigger: paginationAllValue === 'pagination_click' && (nextLink || curPos2 < numberOfPages - 1) ? `.infoblock-id-${subClassId} .button-container-pagination-ajax .button2` : false,
        });

        ias.on('appended', function (event) {
            // updateAddCartButton();
            // lazyLoadInstance.update();
        });

        /* На последней странице удаляем div с пагинацией, чтоб она не мешала стилям */
        ias.on('last', function () {
            document.querySelector(`.infoblock-id-${subClassId} .pagination-ajax-container`).remove();
        })

        /* Обновление урла и тайтла при пагинации */
        // ias.on('page', event => {
        //     // update the title
        //     document.title = event.title;
        //
        //     // update the url
        //     history.replaceState(history.state, event.title, event.url);
        // });
    }
}

//  Инициализация кнопок «Положить в корзину» модуля "Интернет-магазин"
// function updateAddCartButton () {
//     if (document.querySelectorAll('.tpl-link-cart-add').length) {
//         document.querySelectorAll('.tpl-link-cart-add').forEach(elem => {
//             const form = elem.closest('form');
//
//             showLoader();
//
//             fetch(`${form.getAttribute('action')}?json=1`, {
//                 method: 'POST',
//                 body: new FormData(form)
//             })
//                 .then(response => response.json())
//                 .then(processCartResponse)
//                 .catch(processCartError);
//
//             // $.post(form.attr('action'), form.serialize() + "&json=1", null, 'json')
//             //     .done(function(response) { processCartResponse(response); })
//             //     .fail(processCartError);
//             return false;
//         });
//     }
// }

export default pagination;