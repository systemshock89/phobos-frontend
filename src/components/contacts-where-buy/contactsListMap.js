/**
 * https://yandex.ru/dev/jsapi30/doc/ru/ api
 * https://yandex.ru/dev/jsapi30/doc/ru/examples/cases/async-api-load Асинхронная загрузка JS Map API
 * https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/ пакеты
 * https://qna.habr.com/q/1323618 полезное
 *
 *
 * Долгота longitude coord2 - указывает его положение к западу или востоку
 * Широта Latitude coord1 - обозначает расположение места к северу или югу от экватора
 */

import loadScript from "../../js/modules/loadScript.js";
import slideToggle from "../../js/modules/slideToggle.js";

// карта в "Где купить" со всеми объектами
function contactsListMap() {
    window.contactsListMap = (mapMarkers = [], apiKeyYandex = null) => {

        if(!apiKeyYandex){
            console.error('Не введен API-ключ яндекса!');
            return false;
        }

        const mapElement = document.getElementById('contacts-block-list__map');
        if (!mapElement) {
            console.error(`Элемент с карты ID ${mapElement.id} не найден`);
            return;
        }

        handleMapButton(apiKeyYandex, mapElement, mapMarkers);
    }
}

async function createMap(mapElement, mapMarkers) {
    await ymaps3.ready;

    // map
    const {
        YMap,
        YMapDefaultSchemeLayer
    } = ymaps3;

    const map = new YMap(
        mapElement,
        {
            location: {
                center: (mapMarkers.length === 1 ? [mapMarkers[0]['coord2'], mapMarkers[0]['coord1']] : [37.64, 55.76]), // [37.64, 55.76] координаты Москвы
                zoom: 16,
            }
        }
    );

    map.addChild(new YMapDefaultSchemeLayer());
    // /map

    // controls
    if (window.innerWidth > 768) { // только на планшете и десктопе
        const {
            YMapControls,
        } = ymaps3;

        const {
            YMapZoomControl,
            YMapGeolocationControl
        } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');

        const controls = new YMapControls({position: 'right', orientation: 'vertical'});

        controls.addChild(
            new YMapZoomControl({
                easing: 'linear'
            })
        );

        controls.addChild(new YMapGeolocationControl());
        map.addChild(controls);
    }
    // /controls

    // marker default
    const {
        YMapDefaultFeaturesLayer
    } = ymaps3;

    const {
        YMapDefaultMarker,
    } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    const markersLayer = map.addChild(new YMapDefaultFeaturesLayer({zIndex: 1800}));
    const arrLng = [];
    const arrLat = [];

    mapMarkers.forEach((item, key) => {
        const popupContent = createPopupContent(item);

        const defaultMarker = new YMapDefaultMarker({
            coordinates: [item['coord2'], item['coord1']],
            title: `<div class="ymap-title">${item['title_h1']}</div>`,
            subtitle: `<div class="ymap-subtitle">${item['adress_text']}</div>`,
            color: 'blue',
            popup: {
                content: popupContent,
                hidesMarker: true,
                position: "right"
            }
        });

        markersLayer.addChild(defaultMarker);

        arrLng.push(item['coord2']);
        arrLat.push(item['coord1']);
    });
    // /marker default

    if(mapMarkers.length > 1){
        const min = (values) => values.reduce((x, y) => Math.min(x, y));
        const max = (values) => values.reduce((x, y) => Math.max(x, y));

        const minLng = min(arrLng);
        const maxLng = max(arrLng);
        const minLat = min(arrLat);
        const maxLat = max(arrLat);

        map.setLocation({
            bounds: [
                [minLng, maxLat],
                [maxLng, minLat]
            ],
        });
    }
}

// Создание контента для всплывающего окна
const createPopupContent = (item) => {
    const { link, img_preview, phone1, phone2, phone3, email, email2, email3, title_h1, adress_text } = item;
    let content = `<div class="ymap">
        <a href="${link}" class="ymap__title link">${title_h1}</a>
        <div class="ymap__text">${adress_text}</div>`;

    if (img_preview || phone1 || phone2 || phone3 || email || email2 || email3) {
        content += '<div class="ymap__flex">';
        if (img_preview) {
            content += `<a href="${link}"><img class="ymap__img img-fluid" src="${img_preview}"></a>`;
        }
        content += '<div class="ymap__text-container">';
        if (phone1) content += `<a href="tel:${phone1}" class="link nowrap" title="Позвонить">${phone1}</a>`;
        if (phone2) content += `<a href="tel:${phone2}" class="link nowrap" title="Позвонить">${phone2}</a>`;
        if (phone3) content += `<a href="tel:${phone3}" class="link nowrap" title="Позвонить">${phone3}</a>`;
        if (email) content += `<a href="mailto:${email}" class="link" title="Написать письмо">${email}</a>`;
        if (email2) content += `<a href="mailto:${email2}" class="link" title="Написать письмо">${email2}</a>`;
        if (email3) content += `<a href="mailto:${email3}" class="link" title="Написать письмо">${email3}</a>`;
        content += '</div></div>';
    }

    content += `<div class="ymap__btns">
        <a href="https://yandex.ru/maps/?rtext=~${item.coord1}%2C${item.coord2}" class="ymap__btn" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" fill="none"><path fill="#F43" d="M7 0a7 7 0 0 0-4.95 11.95c1.27 1.27 4.25 3.1 4.42 5.03.03.28.24.52.53.52.29 0 .5-.24.53-.52.17-1.93 3.15-3.76 4.42-5.03A7 7 0 0 0 7 0z"/><path fill="#fff" d="M7 9.45a2.45 2.45 0 1 0 0-4.9 2.45 2.45 0 0 0 0 4.9z"/></svg>
            Как добраться
        </a>
        <a href="https://3.redirect.appmetrica.yandex.com/route?end-lat=${item.coord1}&end-lon=${item.coord2}&appmetrica_tracking_id=1178268795219780156" class="ymap__btn" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#fc0" d="M4.5 1A3.5 3.5 0 0 0 1 4.5V9h16V4.5A3.5 3.5 0 0 0 13.5 1h-9z"/><path fill="#e6e6e6" d="M1 9v4.5A3.5 3.5 0 0 0 4.5 17H9V9H1z"/><path fill="#000" d="M9 9v8h4.5a3.5 3.5 0 0 0 3.5-3.5V9H9z"/></svg>
            Доехать на такси
        </a>
    </div></div>`;

    return content;
}

// Обработка кнопки карты
const handleMapButton = (apiKeyYandex, mapElement, mapMarkers) => {
    // Flag that indicates whether the JS Map API is currently being loaded
    let isLoading = false;

    const btnMap = document.querySelector('.contacts-block-list__button');
    if (!btnMap) return;

    btnMap.addEventListener('click', (e) => {
        e.preventDefault();
        btnMap.classList.toggle('contacts-block-list__button_open');
        btnMap.textContent = btnMap.classList.contains('contacts-block-list__button_open')
            ? 'Свернуть карту'
            : 'Развернуть карту';
        document.querySelector('.contacts-block-list__map').slideToggle();
    });

    btnMap.addEventListener('click', async () => {
        // If the JS Map API is currently loading, then do nothing
        if (isLoading) return;

        // If ymaps3 is not defined, fetch the script and create the map
        if (typeof ymaps3 === 'undefined') {

            loadScript(`https://api-maps.yandex.ru/v3/?apikey=${apiKeyYandex}&lang=ru_RU`)
                .then(() => {
                    isLoading = true;

                    mapElement.classList.add('loader-hide');
                    createMap(mapElement, mapMarkers);
                })
                .catch(error => {
                    console.error('Ошибка загрузки скрипта яндекс.карт:', error);
                });

            return;
        }

        // If the map is not yet created, create it
        if (!window.map) {
            createMap(mapElement, mapMarkers);
        }
    }, {once: true});
}

// Выбор города
function selectCity(){
    document.querySelector(".form-control_select-city")?.addEventListener('change', (e) => {
        if(e.target.value > 0){
            document.querySelector(".contacts-block-list__form-city").submit();
        }
    });
}

export default contactsListMap;
export {selectCity};