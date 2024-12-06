import Swiper from 'swiper';
import { Navigation, Pagination, A11y, EffectFade } from 'swiper/modules';

function sliderForm(){
  document.querySelectorAll('.slider-form').forEach(slider => {
    const selector = '.' + slider.classList.value.trim().replace(/\s+/g, '.');
    const swiper = new Swiper(selector + ' .swiper', {
      modules: [Navigation, Pagination, A11y, EffectFade],
      pagination: {
        el: selector + " .swiper-pagination-fraction",
        type: "fraction",
      },
      navigation: {
        nextEl: selector + ' .slider-form__button-next',
        prevEl: selector + ' .slider-form__button-prev',
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      simulateTouch: false,
      allowTouchMove: false,
      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        firstSlideMessage: 'Это первый слайд',
        lastSlideMessage: 'Это последний слайд',
        paginationBulletMessage: 'К слайду №{{index}}'
      },
    });

    // swiper__pagination
    const paginations = document.querySelectorAll(`${selector} .slider-form__pagination`);
    const paginationFractionFirstSlide = document.querySelector(selector + " .swiper-pagination-fraction");

    swiper.slides.forEach((slide, key) => {
      const dots = [];
      const fragment = document.createDocumentFragment(); // фрагмент для оптимизации работы с DOM

      for (let i = 0; i < swiper.slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-form__pagination-item');

        if (i === 0) {
          dot.classList.add('slider-form__pagination_active');
        }

        fragment.appendChild(dot);
        dots.push(dot);
      }

      paginations[key].appendChild(fragment); // добавляем все элементы за один раз
    });

    swiper.on('slideChange', () => {
      swiper.slides[swiper.activeIndex].querySelector(".swiper-pagination-fraction").innerHTML = paginationFractionFirstSlide.innerHTML;

      paginations.forEach(pagination => {
        const dots = pagination.querySelectorAll('.slider-form__pagination-item');

        dots.forEach((dot, i) => {
          dot.classList.toggle('slider-form__pagination_active', i <= swiper.activeIndex);
        });
      });
    });

  });
}

export default sliderForm;