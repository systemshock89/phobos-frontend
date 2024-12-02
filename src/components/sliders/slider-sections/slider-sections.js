import Swiper from 'swiper';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

function sliderSections(){
    document.querySelectorAll('.slider-sections').forEach(slider => {
        const selector = '.' + slider.classList.value.trim().replace(/\s+/g, '.');
        const swiper = new Swiper(selector + ' .swiper', {
            modules: [Navigation, Pagination, A11y, Autoplay],
            loop: slider.querySelectorAll('.swiper-slide').length > 4,
            slidesPerView: 2,
            spaceBetween: 12,
            breakpoints: {
                // 426: {
                //     slidesPerView: 2,
                // },
                // 576: {
                //     slidesPerView: 2,
                // },
                768: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 4,
                },
                1360: {
                    slidesPerView: 6,
                }
            },
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
        });
    });
}
export default sliderSections;