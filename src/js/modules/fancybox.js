/**
 * https://fancyapps.com/
 * https://github.com/fancyapps/ui
 */

import { Fancybox } from "@fancyapps/ui";
function fancybox(){
    Fancybox.defaults.l10n = {
        CLOSE: "Закрыть",
        NEXT: "Следующий",
        PREV: "Предыдущий",
        MODAL: "Вы можете закрыть окно нажатием ESC",
        ERROR: "Ошибка, попробуйте повторить попытку",
        IMAGE_ERROR: "Изображение не найдено",
        ELEMENT_NOT_FOUND: "HTML элемент не найден",
        AJAX_NOT_FOUND: "Ошибка загрузки AJAX: Не найдено",
        AJAX_FORBIDDEN: "Ошибка загрузки AJAX: Запрещено",
        IFRAME_ERROR: "Ошибка при загрузке фрейма",
        TOGGLE_ZOOM: "Приблизить",
        TOGGLE_THUMBS: "Миниатюры",
        TOGGLE_SLIDESHOW: "Слайдшоу",
        TOGGLE_FULLSCREEN: "Полноэкранный режим",
        DOWNLOAD: "Загрузить",
        ITERATEZOOM: "Изменить масштаб"
    };
    Fancybox.bind("[data-fancybox]");
}
export default fancybox;