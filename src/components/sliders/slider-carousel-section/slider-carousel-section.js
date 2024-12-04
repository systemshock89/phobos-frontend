import Swiper from 'swiper';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

const sliderSectionCarouselFunc = () => {
    window.sliderSectionCarousel = (sliderClassId, col, col_sm, col_md, col_lg, col_xl, col_xxl) => {
        const selector = '.section_slider-carousel.' + sliderClassId;
        const sliderClass = document.querySelector('.' + sliderClassId);
        const swiperWrapper = document.querySelector(selector + ' :where(.grid, .grid-flex, .pagination-ajax-wrapper)');

        // swiperWrapper.classList.remove('grid', 'grid-flex', 'mb', 'pagination-ajax-wrapper');

        // Clear existing classes
        swiperWrapper.className = 'swiper-wrapper';

        Array.from(swiperWrapper.children).forEach(child => child.classList.add('swiper-slide'));

        const nav = `
            <button class="swiper-button-prev-custom">
                <svg><use xlink:href="img/sprite.svg#arrow-left"></use></svg>
            </button>
            <button class="swiper-button-next-custom">
                <svg><use xlink:href="img/sprite.svg#arrow-left"></use></svg>
            </button>
            <div class="swiper-pagination"></div>
        `;

        const swiperWrapperNew = `
            <div class="swiper-container mb">
                <div class="swiper">${swiperWrapper.outerHTML}</div>
                ${nav}
            </div>
        `;
        swiperWrapper.outerHTML = swiperWrapperNew;

        const spaceBetweenVal = sliderClass.classList.contains('gallery-fw') ? 0 : 30;

        const breakpointsObj = {
            0: {
                slidesPerView: col,
                slidesPerGroup: col,
                spaceBetween: 15,
            },
            576: {
                slidesPerView: col_sm,
                slidesPerGroup: col_sm,
                spaceBetween: 15
            },
            768: {
                slidesPerView: col_md,
                slidesPerGroup: col_md,
                spaceBetween: spaceBetweenVal,
            },
            992: {
                slidesPerView: col_lg,
                slidesPerGroup: col_lg,
                spaceBetween: spaceBetweenVal,
            },
            1360: {
                slidesPerView: col_xl,
                slidesPerGroup: col_xl,
                spaceBetween: spaceBetweenVal,
            },
            ...(col_xxl ? {
                1930: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: spaceBetweenVal,
                }
            } : {}),
        };

        const swiper = new Swiper(selector + ' .swiper', {
            modules: [Navigation, Pagination, A11y, Autoplay],
            rewind: true,
            centerInsufficientSlides: true,
            breakpoints: breakpointsObj,
            autoplay: {
                delay: 9000,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: selector + ' .swiper-button-next-custom',
                prevEl: selector + ' .swiper-button-prev-custom',
            },
            pagination: {
                el: selector + ' .swiper-pagination',
                bulletElement: 'button',
                clickable: true,
                dynamicBullets: true
            },
            a11y: {
                prevSlideMessage: 'Предыдущий слайд',
                nextSlideMessage: 'Следующий слайд',
                firstSlideMessage: 'Это первый слайд',
                lastSlideMessage: 'Это последний слайд',
                paginationBulletMessage: 'К слайду №{{index}}'
            },
            // on: {
            //     init: function () {
            //         if(sliderClass.classList.contains('text-block-fw')){
            //             lazyLoadInstance2.update();
            //         }
            //     },
            // },
        });
    }
}

export default sliderSectionCarouselFunc;