/**
 * https://yandex.ru/dev/jsapi30/doc/ru/ api
 * https://yandex.ru/dev/jsapi30/doc/ru/examples/cases/async-api-load Асинхронная загрузка JS Map API
 * https://yandex.ru/dev/jsapi30/doc/ru/ref/packages/ пакеты
 * https://qna.habr.com/q/1323618 полезное
 *
 * Долгота longitude coord2 - указывает его положение к западу или востоку
 * Широта Latitude coord1 - обозначает расположение места к северу или югу от экватора
 */

import loadScript from "../../js/modules/loadScript.js";

// генерируемая карта в Контактах и внутренней "Где купить"
function contactsMap() {
    window.contactsMap = (mapID, coord1, coord2, name, address, zoom = 15, apiKeyYandex = null) => {

        if(!apiKeyYandex){
            console.error('Не введен API-ключ яндекса!');
            return;
        }

        const mapElement = document.getElementById(mapID);
        if (!mapElement) {
            console.error(`Элемент с карты ID ${mapID} не найден`);
            return;
        }

        const mapMarker = {coord1, coord2, name, address, zoom};

        observerMapApi(apiKeyYandex, mapElement, mapMarker);

    }
}

const createMap = async (mapElement, mapMarker) => {
    await ymaps3.ready;

    const {coord1, coord2, name, address, zoom} = mapMarker;

    // map
    const {
        YMap,
        YMapDefaultSchemeLayer
    } = ymaps3;

    const map = new YMap(
        mapElement,
        {
            location: {
                center: [coord2, coord1],
                zoom: zoom,
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

    const defaultMarker = new YMapDefaultMarker({
        coordinates: [coord2, coord1],
        title: `<div class="ymap-title">${name}</div>`,
        subtitle: `
                        <div class="ymap">
                            <div class="ymap__text">${address}</div>
                            <div class="ymap__btns">
                                <a href="https://yandex.ru/maps/?rtext=~${coord1}%2C${coord2}" class="ymap__btn" target="_blank">                        
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" fill="none"><path fill="#F43" d="M7 0a7 7 0 0 0-4.95 11.95c1.27 1.27 4.25 3.1 4.42 5.03.03.28.24.52.53.52.29 0 .5-.24.53-.52.17-1.93 3.15-3.76 4.42-5.03A7 7 0 0 0 7 0z"/><path fill="#fff" d="M7 9.45a2.45 2.45 0 1 0 0-4.9 2.45 2.45 0 0 0 0 4.9z"/></svg>
                                    Как добраться
                                </a>
                                <a href="https://3.redirect.appmetrica.yandex.com/route?end-lat=${coord1}&end-lon=${coord2}&appmetrica_tracking_id=1178268795219780156" class="ymap__btn" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"><path fill="#fc0" d="M4.5 1A3.5 3.5 0 0 0 1 4.5V9h16V4.5A3.5 3.5 0 0 0 13.5 1h-9z"/><path fill="#e6e6e6" d="M1 9v4.5A3.5 3.5 0 0 0 4.5 17H9V9H1z"/><path fill="#000" d="M9 9v8h4.5a3.5 3.5 0 0 0 3.5-3.5V9H9z"/></svg>
                                    Доехать на такси
                                </a>
                            </div>                                               
                        </div>
                `,
        color: 'blue',
        // popup: {
        //     content: 'test test test',
        //     // hidesMarker: true,
        //     position: "top"
        // }
    });

    map.addChild(new YMapDefaultFeaturesLayer({zIndex: 1800}))
        .addChild(defaultMarker);
    // /marker default

    // marker custom
    // const {
    //     YMapMarker
    // } = ymaps3;
    // const content = document.createElement('div');
    // const marker = new YMapMarker({
    //     coordinates: [coord2, coord1]
    // },content);
    //
    // content.innerHTML = '<div style="background-color: #fff;padding: 15px; width: 100px;">Тут может быть все что угодно</div>';
    //
    // map.addChild(marker);
    // /marker custom
}

const observerMapApi = (apiKeyYandex, mapElement, mapMarker) => {
    // Flag that indicates whether the JS Map API is currently being loaded
    let isLoading = false;

    const observer = new IntersectionObserver(async (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the JS Map API is currently loading, then do nothing
                if (isLoading) return;

                // If ymaps3 is not defined, fetch the script and create the map
                if (typeof ymaps3 === 'undefined') {

                    loadScript(`https://api-maps.yandex.ru/v3/?apikey=${apiKeyYandex}&lang=ru_RU`)
                        .then(() => {
                            isLoading = true;

                            mapElement.classList.add('loader-hide');
                            createMap(mapElement, mapMarker);
                            observer.unobserve(entry.target);
                        })
                        .catch(error => {
                            console.error('Ошибка загрузки скрипта яндекс.карт:', error);
                        });

                    return;
                }

                // If the map is not yet created, create it
                if (!window.map) {
                    createMap(mapElement, mapMarker);
                }

                observer.unobserve(entry.target);
            }
        });
    });
    observer.observe(mapElement);
}

export default contactsMap;